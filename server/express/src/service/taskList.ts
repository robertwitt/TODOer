import Task from "../model/task";
import TaskList, {
  TaskListColor,
  TaskListData,
  TaskListId,
  TaskListIsDefaultCollection,
  TaskListIsDeletable,
  TaskListIsUpdatable,
  TaskListTitle,
  TaskListType,
} from "../model/taskList";
import { repositoryFactory } from "../repository";
import { ApiError } from "./error";
import TaskService, { TaskPayload } from "./task";

export type TaskListPayload = {
  id: TaskListId;
  title: TaskListTitle | null;
  color: TaskListColor | null;
  type: TaskListType;
  isUpdatable: TaskListIsUpdatable;
  isDeletable: TaskListIsDeletable;
  isDefaultCollection: TaskListIsDefaultCollection;
};

export type TaskListWithTasksPayload = {
  id: TaskListId;
  title: TaskListTitle | null;
  color: TaskListColor | null;
  type: TaskListType;
  assignedTasks: TaskPayload[];
};

export type TaskListCreatePayload = {
  title?: TaskListTitle | null;
  color?: TaskListColor | null;
  isDefaultCollection?: TaskListIsDefaultCollection;
};

export type TaskListUpdatePayload = {
  title?: TaskListTitle | null;
  color?: TaskListColor | null;
};

/**
 * Implementation of a service for TaskList entities
 */
export default class TaskListService {
  /**
   * Get a payload from a TaskList entity
   * @param model a TaskList entity
   * @returns payload representation of a task list
   */
  static createTaskListPayload(model: TaskList): TaskListPayload {
    return {
      id: model.id,
      title: model.title ?? null,
      color: model.color ?? null,
      type: model.type,
      isUpdatable: model.isUpdatable,
      isDeletable: model.isDeletable,
      isDefaultCollection: model.isDefaultCollection,
    };
  }

  /**
   * Get a task list by its ID
   * @param id a task list's ID
   * @returns TaskList entity
   */
  async getTaskList(id: TaskListId): Promise<TaskListPayload> {
    const repository = repositoryFactory.getTaskListRepository();
    const list = await repository.findById(id);
    if (!list) {
      throw ApiError.notFound(`A task list with ID ${id} does not exist`);
    }
    return TaskListService.createTaskListPayload(list);
  }

  /**
   * Get a task list with its assigned tasks
   * @param id a task list's ID
   * @returns TaskList entity with assigned Tasks
   */
  async getTaskListWithTasks(
    id: TaskListId
  ): Promise<TaskListWithTasksPayload> {
    const list = await this.getTaskList(id);
    const repository = repositoryFactory.getTaskRepository();

    let tasks: Task[];
    switch (list.type) {
      case TaskListType.Collection:
        tasks = await repository.findAllByCollection(list.id);
        break;
      case TaskListType.MyDay:
        tasks = await repository.findAllByDueDate("TODO", true);
        break;
      case TaskListType.Tomorrow:
        tasks = await repository.findAllByDueDate("TODO");
        break;
      default:
        throw ApiError.serverError(`Task list type '${list.type}' is invalid`);
    }

    return {
      id: list.id,
      title: list.title,
      color: list.color,
      type: list.type,
      assignedTasks: tasks.map(TaskService.createTaskPayload),
    };
  }

  /**
   * Find task lists
   * @param params optional filter parameters
   * @returns a list of TaskList entities
   */
  async findTaskLists(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: Record<string, never> = {}
  ): Promise<TaskListPayload[]> {
    const repository = repositoryFactory.getTaskListRepository();
    return (await repository.findAll()).map(
      TaskListService.createTaskListPayload
    );
  }

  /**
   * Create a new task list with given data
   * @param payload data to create the task list with
   * @returns created task list
   */
  async createTaskList(
    payload: TaskListCreatePayload
  ): Promise<TaskListPayload> {
    const repository = repositoryFactory.getTaskListRepository();
    let taskList: TaskList;
    try {
      const data: TaskListData = {
        title: payload.title ?? undefined,
        color: payload.color ?? undefined,
        type: TaskListType.Collection,
        isDefaultCollection: payload.isDefaultCollection,
      };
      taskList = repository.create(data);
    } catch (error) {
      throw ApiError.badRequest(error);
    }

    taskList = await repository.save(taskList);
    return TaskListService.createTaskListPayload(taskList);
  }

  /**
   * Update a given task list with given data
   * @param id a task list's ID
   * @param payload data to update the task list with
   * @returns updated task list
   */
  async updateTaskList(
    id: TaskListId,
    payload: TaskListUpdatePayload
  ): Promise<TaskListPayload> {
    const repository = repositoryFactory.getTaskListRepository();
    let taskList = await repository.findById(id);
    if (!taskList) {
      throw ApiError.notFound(`A task list with ID ${id} does not exist`);
    }
    if (!taskList.isUpdatable) {
      throw ApiError.badRequest(`Task list ${id} cannot be updated`);
    }

    try {
      if (payload.title !== undefined) {
        taskList.title = payload.title ?? undefined;
      }
      if (payload.color !== undefined) {
        taskList.color = payload.color ?? undefined;
      }
    } catch (error) {
      throw ApiError.badRequest(error);
    }

    taskList = await repository.save(taskList);
    return TaskListService.createTaskListPayload(taskList);
  }

  /**
   * Delete a task list with a given ID
   * @param id a task list's ID
   */
  async deleteTaskList(id: TaskListId): Promise<void> {
    const repository = repositoryFactory.getTaskListRepository();
    const taskList = await repository.findById(id);
    if (!taskList) {
      throw ApiError.notFound(`A task list with ${id} does not exists`);
    }
    if (!taskList.isDeletable) {
      throw ApiError.badRequest(`Task list ${taskList.id} cannot be deleted`);
    }
    if (
      (await repositoryFactory.getTaskRepository().countByCollection(id)) > 0
    ) {
      throw ApiError.badRequest(
        `Task list ${taskList.id} cannot be deleted as long as it has tasks assigned`
      );
    }
    await repository.deleteById(id);
  }

  /**
   * Make a task list the new default.
   * @param id a task list's ID
   */
  async makeTaskListTheDefault(id: TaskListId): Promise<void> {
    const repository = repositoryFactory.getTaskListRepository();

    const newDefaultList = await repository.findById(id);
    if (!newDefaultList) {
      throw ApiError.notFound(`A task list with ID ${id} does not exist`);
    }
    if (newDefaultList.isDefaultCollection) {
      return;
    }
    if (!newDefaultList.isUpdatable) {
      throw ApiError.badRequest(`Task list ${id} cannot be updated`);
    }
    newDefaultList.isDefaultCollection = true;

    const oldDefaultList = await repository.getDefault();
    oldDefaultList.isDefaultCollection = false;

    await Promise.all([
      repository.save(newDefaultList),
      repository.save(oldDefaultList),
    ]);
  }
}
