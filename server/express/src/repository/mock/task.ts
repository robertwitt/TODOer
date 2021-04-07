import Task, { TaskId } from "../../model/task";
import { TaskRepository } from "../task";

export default class TaskMockRepository implements TaskRepository {
  getOne(id: TaskId): Promise<Task | undefined> {
    throw new Error("Method not implemented.");
  }
}
