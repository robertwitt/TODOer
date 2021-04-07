import { MockRepositoryFactory } from "./mock";
import { TaskRepository } from "./task";

/**
 * Factory to create Repository objects
 */
export interface RepositoryFactory {
  /**
   * Get a repository for Task entities
   * @returns a Task repository
   */
  getTaskRepository(): TaskRepository;
}

export const repositoryFactory = new MockRepositoryFactory();
