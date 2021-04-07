import Task, { TaskId } from "../model/task";

/**
 * Repository to managed Task entities
 */
export interface TaskRepository {
  /**
   * Get a single task by ID
   * @param id a task's ID
   * @returns optional Task entity
   */
  getOne(id: TaskId): Promise<Task | undefined>;
}
