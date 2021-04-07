import { RepositoryFactory } from "..";
import { TaskRepository } from "../task";
import TaskMockRepository from "./task";

export class MockRepositoryFactory implements RepositoryFactory {
  getTaskRepository(): TaskRepository {
    return new TaskMockRepository();
  }
}
