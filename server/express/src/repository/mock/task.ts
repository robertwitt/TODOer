import Task, { TaskId } from "../../model/task";
import { TaskRepository } from "../task";
import { AbstractMockRepository } from "./abstract";

export default class TaskMockRepository
  extends AbstractMockRepository
  implements TaskRepository {
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

  findAll(): Promise<Task[]> {
    const tasks = Array.from(this.db.tasks.values())
      .sort(this.sortTasks)
      .map(this.copyTask);
    return Promise.resolve(tasks);
  }

  private sortTasks(task1: Task, task2: Task): number {
    return task1.id - task2.id;
  }

  findAllByCollection(collection: number): Promise<Task[]> {
    const tasks = Array.from(this.db.tasks.values())
      .filter((task) => task.collection.id === collection)
      .sort(this.sortTasks)
      .map(this.copyTask);
    return Promise.resolve(tasks);
  }
}
