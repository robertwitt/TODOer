import Task from "../../model/task";
import { TaskListId, TaskListRef } from "../../model/taskList";
import TaskPriority from "../../model/taskPriority";
import TaskStatus from "../../model/taskStatus";

export default class MockDb {
  private static singleton: MockDb;

  static get instance(): MockDb {
    if (!this.singleton) {
      this.singleton = new MockDb();
      this.singleton.initialize();
    }
    return this.singleton;
  }

  private _tasks: Map<TaskListId, Task>;

  private constructor() {
    this._tasks = new Map();
  }

  get tasks(): Map<TaskListId, Task> {
    return this._tasks;
  }

  private initialize(): void {
    const myTasks: TaskListRef = { id: 1, title: "My Tasks" };
    const openStatus = new TaskStatus("O", "open");
    const doneStatus = new TaskStatus("D", "done");
    const lowPriority = new TaskPriority(5, "low");
    this.tasks.set(
      1,
      new Task(1, {
        title: "Tax declaration",
        collection: myTasks,
        dueDate: "2021-05-31",
        status: openStatus,
        priority: lowPriority,
      })
    );
    this.tasks.set(
      2,
      new Task(2, {
        title: "Groceries shopping",
        collection: myTasks,
        status: openStatus,
        priority: lowPriority,
      })
    );
    this.tasks.set(
      42,
      new Task(42, {
        title: "What is the meaning of life?",
        collection: { id: 42 },
        status: doneStatus,
      })
    );
  }
}
