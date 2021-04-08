import { MockRepositoryFactory } from "./mock";
import { TaskRepository } from "./task";
import { TaskStatusRepository } from "./taskStatus";

/**
 * Factory to create Repository objects
 */
export interface RepositoryFactory {
  /**
   * Get a repository for Task entities
   * @returns a Task repository
   */
  getTaskRepository(): TaskRepository;

  /**
   * Get a repository for TaskStatus entities
   * @returns a TaskStatus repository
   */
  getTaskStatusRepository(): TaskStatusRepository;
}

export const repositoryFactory = new MockRepositoryFactory();
