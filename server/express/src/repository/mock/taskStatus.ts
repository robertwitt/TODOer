import TaskStatus, { TaskStatusCode } from "../../model/taskStatus";
import { TaskStatusRepository } from "../taskStatus";
import MockDb from "./db";

export default class TaskStatusMockRepository implements TaskStatusRepository {
  private readonly db = MockDb.instance;

  findByCode(code: TaskStatusCode): Promise<TaskStatus | undefined> {
    const status = this.db.taskStatuses.get(code);
    return Promise.resolve(status ? this.copyTaskStatus(status) : undefined);
  }

  private copyTaskStatus(status: TaskStatus): TaskStatus {
    return new TaskStatus(status.code, status.name);
  }
}
