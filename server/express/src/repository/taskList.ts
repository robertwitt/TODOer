import { TaskListId, TaskListRef } from "../model/taskList";

/**
 * Repository to managed TaskList entities
 */
export interface TaskListRepository {
  /**
   * Get a single task list reference by ID
   * @param id a task list's ID
   * @returns optional reference of a TaskList entity
   */
  findRefById(id: TaskListId): Promise<TaskListRef | undefined>;
}
