import Task, {
  TaskData,
  TaskDueDate,
  TaskDueTime,
  TaskId,
  TaskIsDeletable,
  TaskIsPlannedForMyDay,
  TaskIsUpdatable,
  TaskTitle,
} from "../model/task";
import { TaskListId, TaskListTitle } from "../model/taskList";
import { TaskPriorityCode, TaskPriorityName } from "../model/taskPriority";
import { TaskStatusCode, TaskStatusName } from "../model/taskStatus";
import { repositoryFactory } from "../repository";
import { ApiError } from "./error";

export type TaskPayload = {
  id: TaskId;
  title: TaskTitle | null;
  collection: {
    id: TaskListId;
    title: TaskListTitle | null;
  };
  dueDate: TaskDueDate | null;
  dueTime: TaskDueTime | null;
  status: {
    code: TaskStatusCode;
    name: TaskStatusName | null;
  };
  isUpdatable: TaskIsUpdatable;
  isDeletable: TaskIsDeletable;
  priority: null | {
    code: TaskPriorityCode;
    name: TaskPriorityName | null;
  };
  isPlannedForMyDay: TaskIsPlannedForMyDay;
};

export type TaskCreatePayload = {
  title?: TaskTitle | null;
  collection: TaskListId;
  dueDate?: TaskDueDate | null;
  dueTime?: TaskDueTime | null;
  priority?: TaskPriorityCode | null;
  isPlannedForMyDay?: TaskIsPlannedForMyDay;
};

/**
 * Implementation of a service for Task entities
 */
export default class TaskService {
  /**
   * Get a single task by ID
   * @param id a task's ID
   * @returns optional Task entity
   */
  async getTask(id: TaskId): Promise<TaskPayload | undefined> {
    const repository = repositoryFactory.getTaskRepository();
    const task = await repository.findById(id);
    return task ? this.createTaskPayload(task) : undefined;
  }

  private createTaskPayload(model: Task): TaskPayload {
    return {
      id: model.id,
      title: model.title ?? null,
      collection: {
        id: model.collection.id,
        title: model.collection.title ?? null,
      },
      dueDate: model.dueDate ?? null,
      dueTime: model.dueTime ?? null,
      isUpdatable: model.isUpdatable,
      isDeletable: model.isDeletable,
      status: {
        code: model.status.code,
        name: model.status.name ?? null,
      },
      priority: model.priority
        ? { code: model.priority.code, name: model.priority.name ?? null }
        : null,
      isPlannedForMyDay: model.isPlannedForMyDay,
    };
  }

  async findTasks(
    params: { collection?: TaskListId } = {}
  ): Promise<TaskPayload[]> {
    const repository = repositoryFactory.getTaskRepository();
    const { collection } = params;
    const tasks = collection
      ? repository.findAllByCollection(collection)
      : repository.findAll();
    return (await tasks).map(this.createTaskPayload);
  }

  async createTask(payload: TaskCreatePayload): Promise<TaskPayload> {
    const listRepository = repositoryFactory.getTaskListRepository();
    const statusRepository = repositoryFactory.getTaskStatusRepository();
    const priorityRepository = repositoryFactory.getTaskPriorityRepository();
    const taskRepository = repositoryFactory.getTaskRepository();

    let task: Task;
    try {
      const data: TaskData = {
        title: payload.title ?? undefined,
        collection: await listRepository.getOneRef(payload.collection),
        dueDate: payload.dueDate ?? undefined,
        dueTime: payload.dueTime ?? undefined,
        status: await statusRepository.getOne("O"),
        priority: payload.priority
          ? await priorityRepository.getOne(payload.priority)
          : undefined,
        isPlannedForMyDay: payload.isPlannedForMyDay ?? undefined,
      };
      task = taskRepository.create(data);
    } catch (error) {
      throw new ApiError(400, error.message);
    }

    task = await taskRepository.save(task);
    return this.createTaskPayload(task);
  }
}
