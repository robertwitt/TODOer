import { Entity } from "./abstract";

export type TaskListId = number;

export type TaskListTitle = string;

export type TaskListRef = {
  id: TaskListId;
  title?: TaskListTitle;
};

type TaskListData = {
  title?: TaskListTitle;
};

export default class TaskList extends Entity<TaskListId, TaskListData> {
  private _title?: TaskListTitle;

  constructor(id: TaskListId, data: TaskListData) {
    super(id, data);
    this._title = data.title;
  }

  get title(): TaskListTitle | undefined {
    return this._title;
  }

  set title(value: TaskListTitle | undefined) {
    this._title = value;
  }

  get ref(): TaskListRef {
    return {
      id: this.id,
      title: this.title,
    };
  }
}
