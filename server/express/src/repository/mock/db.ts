import Task from "../../model/task";
import TaskList, { TaskListId, TaskListType } from "../../model/taskList";
import TaskPriority, { TaskPriorityCode } from "../../model/taskPriority";
import TaskStatus, { TaskStatusCode } from "../../model/taskStatus";

export type MockDbData = {
  collections: TaskList[];
  tasks: Task[];
};

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
  private _taskStatuses: Map<TaskStatusCode, TaskStatus>;
  private _taskPriorities: Map<TaskPriorityCode, TaskPriority>;
  private _taskLists: Map<TaskListId, TaskList>;

  private constructor() {
    this._tasks = new Map();
    this._taskStatuses = new Map();
    this._taskPriorities = new Map();
    this._taskLists = new Map();
  }

  get tasks(): Map<TaskListId, Task> {
    return this._tasks;
  }

  get taskStatuses(): Map<TaskStatusCode, TaskStatus> {
    return this._taskStatuses;
  }

  get taskPriorities(): Map<TaskPriorityCode, TaskPriority> {
    return this._taskPriorities;
  }

  get taskLists(): Map<TaskListId, TaskList> {
    return this._taskLists;
  }

  initializeWith(data: MockDbData): void {
    this.initialize();
    data.collections.forEach((collection) =>
      this.taskLists.set(collection.id, collection)
    );
    data.tasks.forEach((task) => this.tasks.set(task.id, task));
  }

  private initialize(): void {
    this.taskStatuses.clear();
    this.taskStatuses
      .set("O", new TaskStatus("O", "open"))
      .set("D", new TaskStatus("D", "done"))
      .set("X", new TaskStatus("X", "cancelled"));

    this.taskPriorities.clear();
    this.taskPriorities
      .set(1, new TaskPriority(1, "high"))
      .set(3, new TaskPriority(3, "medium"))
      .set(5, new TaskPriority(5, "low"));

    this.taskLists.clear();
    this.taskLists
      .set(2, new TaskList(2, { title: "My Day", type: TaskListType.MyDay }))
      .set(
        3,
        new TaskList(3, { title: "Tomorrow", type: TaskListType.Tomorrow })
      )
      .set(
        1,
        new TaskList(1, {
          title: "My Tasks",
          type: TaskListType.Collection,
          isDefaultCollection: true,
        })
      );

    this.tasks.clear();
  }
}
