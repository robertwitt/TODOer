import { RepositoryFactory } from "..";
import { TaskRepository } from "../task";
import { TaskStatusRepository } from "../taskStatus";
import TaskMockRepository from "./task";
import TaskPriorityMockRepository from "./taskPriority";
import TaskStatusMockRepository from "./taskStatus";

export class MockRepositoryFactory implements RepositoryFactory {
  getTaskRepository(): TaskRepository {
    return new TaskMockRepository();
  }

  getTaskStatusRepository(): TaskStatusRepository {
    return new TaskStatusMockRepository();
  }

  getTaskPriorityRepository(): TaskPriorityMockRepository {
    return new TaskPriorityMockRepository();
  }
}
