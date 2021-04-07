import Task, { TaskId } from "../../model/task";
import { TaskRepository } from "../task";
import MockDb from "./db";

export default class TaskMockRepository implements TaskRepository {
  private readonly db: MockDb;

  constructor() {
    this.db = MockDb.instance;
  }

  findById(id: TaskId): Promise<Task | undefined> {
    const task = this.db.tasks.get(id);
    return Promise.resolve(task ? this.copyTask(task) : undefined);
  }

  private copyTask(task: Task): Task {
    return new Task(task.id, {
      title: task.title,
      collection: { ...task.collection },
      dueDate: task.dueDate,
      dueTime: task.dueTime,
      status: task.status,
      priority: task.priority,
      isPlannedForMyDay: task.isPlannedForMyDay,
    });
  }
}
