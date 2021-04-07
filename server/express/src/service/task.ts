import Task, {
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
}
