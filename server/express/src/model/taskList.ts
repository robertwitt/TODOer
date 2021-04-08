export type TaskListId = number;

export type TaskListTitle = string;

export type TaskListRef = {
  id: TaskListId;
  title?: TaskListTitle;
};

type TaskListData = {
  title?: TaskListTitle;
};

export default class TaskList {
  private readonly _id: TaskListId;
  private _title?: TaskListTitle;

  constructor(id: TaskListId, data: TaskListData) {
    this._id = id;
    this._title = data.title;
  }

  get id(): TaskListId {
    return this._id;
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
