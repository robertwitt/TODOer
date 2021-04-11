import { Entity } from "./abstract";
import { TaskIsDeletable, TaskIsUpdatable } from "./task";

export type TaskListId = number;

export type TaskListTitle = string;

export type TaskListColor = string;

export enum TaskListType {
  Collection = "COLLECTION",
  MyDay = "MY_DAY",
  Tomorrow = "TOMORROW",
}

export type TaskListIsUpdatable = boolean;

export type TaskListIsDeletable = boolean;

export type TaskListIsDefaultCollection = boolean;

export type TaskListRef = {
  id: TaskListId;
  title?: TaskListTitle;
};

export type TaskListData = {
  title?: TaskListTitle;
  color?: TaskListColor;
  type: TaskListType;
  isDefaultCollection?: TaskListIsDefaultCollection;
};

export default class TaskList extends Entity<TaskListId, TaskListData> {
  private _title?: TaskListTitle;
  private _color?: TaskListColor;
  private readonly _type: TaskListType;
  private _isDefaultCollection: TaskListIsDefaultCollection;

  constructor(id: TaskListId, data: TaskListData) {
    super(id, data);
    this._title = data.title;
    this._color = data.color;
    this._type = data.type;
    this._isDefaultCollection =
      data.type === TaskListType.Collection
        ? data.isDefaultCollection ?? false
        : false;
  }

  get title(): TaskListTitle | undefined {
    return this._title;
  }

  set title(value: TaskListTitle | undefined) {
    // TODO Validate title
    this._title = value;
  }

  get color(): TaskListColor | undefined {
    return this._color;
  }

  set color(value: TaskListColor | undefined) {
    // TODO Validate color
    this._color = value;
  }

  get type(): TaskListType {
    return this._type;
  }

  get isUpdatable(): TaskIsUpdatable {
    return this.type === TaskListType.Collection;
  }

  get isDeletable(): TaskIsDeletable {
    return this.type === TaskListType.Collection;
  }

  public get isDefaultCollection(): TaskListIsDefaultCollection {
    return this._isDefaultCollection;
  }

  public set isDefaultCollection(value: TaskListIsDefaultCollection) {
    // TODO Check for type
    this._isDefaultCollection = value;
  }

  get ref(): TaskListRef {
    return {
      id: this.id,
      title: this.title,
    };
  }
}
