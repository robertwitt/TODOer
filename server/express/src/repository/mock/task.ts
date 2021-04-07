import Task, { TaskId } from "../../model/task";
import { TaskRepository } from "../task";
import MockDb from "./db";

export default class TaskMockRepository implements TaskRepository {
  private readonly db: MockDb;

  constructor() {
    this.db = MockDb.instance;
  }

  getOne(id: TaskId): Promise<Task | undefined> {
    return Promise.resolve(this.db.tasks.get(id));
  }
}
