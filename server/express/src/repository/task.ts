import Task, { TaskId } from "../model/task";
import { TaskListId } from "../model/taskList";

/**
 * Repository to managed Task entities
 */
export interface TaskRepository {
  /**
   * Get a single task by ID
   * @param id a task's ID
   * @returns optional Task entity
   */
  findById(id: TaskId): Promise<Task | undefined>;

  /**
   * Get all tasks
   * @returns list of Task entities
   */
  findAll(): Promise<Task[]>;

  /**
   * Get all tasks for a specific collection
   * @param collection ID of a TaskList
   * @returns list of Task entities
   */
  findAllByCollection(collection: TaskListId): Promise<Task[]>;
}
