import { MockRepositoryFactory } from "./mock";
import { TaskRepository } from "./task";

export interface RepositoryFactory {
  getTaskRepository(): TaskRepository;
}

export const repositoryFactory = new MockRepositoryFactory();
