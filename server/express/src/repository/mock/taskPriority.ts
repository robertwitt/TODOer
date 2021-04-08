import TaskPriority, { TaskPriorityCode } from "../../model/taskPriority";
import { TaskPriorityRepository } from "../taskPriority";
import MockDb from "./db";

export default class TaskPriorityMockRepository
  implements TaskPriorityRepository {
  private readonly db = MockDb.instance;

  findByCode(code: TaskPriorityCode): Promise<TaskPriority | undefined> {
    const status = this.db.taskPriorities.get(code);
    return Promise.resolve(status ? this.copyTaskPriority(status) : undefined);
  }

  private copyTaskPriority(status: TaskPriority): TaskPriority {
    return new TaskPriority(status.code, status.name);
  }
}
