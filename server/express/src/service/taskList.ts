import TaskList, {
  TaskListColor,
  TaskListId,
  TaskListIsDefaultCollection,
  TaskListIsDeletable,
  TaskListIsUpdatable,
  TaskListTitle,
  TaskListType,
} from "../model/taskList";
import { repositoryFactory } from "../repository";
import { ApiError } from "./error";

export type TaskListPayload = {
  id: TaskListId;
  title: TaskListTitle | null;
  color: TaskListColor | null;
  type: TaskListType;
  isUpdatable: TaskListIsUpdatable;
  isDeletable: TaskListIsDeletable;
  isDefaultCollection: TaskListIsDefaultCollection;
};

/**
 * Implementation of a service for TaskList entities
 */
export default class TaskListService {
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
    return this.createTaskListPayload(list);
  }

  private createTaskListPayload(model: TaskList): TaskListPayload {
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
}
