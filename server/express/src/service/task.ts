import Task, { TaskId } from "../model/task";
import { repositoryFactory } from "../repository";

/**
 * Implementation of a service for Task entities
 */
export class TaskService {
  /**
   * Get a single task by ID
   * @param id a task's ID
   * @returns optional Task entity
   */
  getTask(id: TaskId): Promise<Task | undefined> {
    const repository = repositoryFactory.getTaskRepository();
    return repository.getOne(id);
  }
}
