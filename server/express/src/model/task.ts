import { TaskListRef } from "./taskList";
import TaskPriority from "./taskPriority";
import TaskStatus from "./taskStatus";

export type TaskId = number;

export type TaskTitle = string;

export type TaskDueDate = string;

export type TaskDueTime = string;

export type TaskIsUpdatable = boolean;

export type TaskIsDeletable = boolean;

export type TaskIsPlannedForMyDay = boolean;

type TaskData = {
  title?: TaskTitle;
  collection: TaskListRef;
  dueDate?: TaskDueDate;
  dueTime?: TaskDueTime;
  status: TaskStatus;
  priority?: TaskPriority;
  isPlannedForMyDay?: TaskIsPlannedForMyDay;
};

export default class Task {
  private readonly _id: TaskId;
  private _title?: TaskTitle;
  private _collection!: TaskListRef;
  private _dueDate?: TaskDueDate;
  private _dueTime?: TaskDueTime;
  private readonly _status: TaskStatus;
  private _priority?: TaskPriority;
  private _isPlannedForMyDay!: TaskIsPlannedForMyDay;

  constructor(id: TaskId, data: TaskData) {
    this._id = id;
    this.title = data.title;
    this.collection = data.collection;
    this.dueDate = data.dueDate;
    this.dueTime = data.dueTime;
    this._status = data.status;
    this.priority = data.priority;
    this.isPlannedForMyDay = data.isPlannedForMyDay ?? false;
  }

  get id(): TaskId {
    return this._id;
  }

  get title(): TaskTitle | undefined {
    return this._title;
  }

  set title(value: TaskTitle | undefined) {
    // TODO Add validation
    this._title = value;
  }

  get collection(): TaskListRef {
    return this._collection;
  }
  set collection(value: TaskListRef) {
    this._collection = value;
  }

  get dueDate(): TaskDueDate | undefined {
    return this._dueDate;
  }

  set dueDate(value: TaskDueDate | undefined) {
    // TODO Add validation
    this._dueDate = value;
  }

  get dueTime(): TaskDueTime | undefined {
    return this._dueTime;
  }

  set dueTime(value: TaskDueTime | undefined) {
    // TODO Add validation
    this._dueTime = value;
  }

  get status(): TaskStatus {
    return this._status;
  }

  get isUpdatable(): TaskIsUpdatable {
    // TODO Implement
    return true;
  }

  get isDeletable(): TaskIsDeletable {
    // TODO Implement
    return true;
  }

  get priority(): TaskPriority | undefined {
    return this._priority;
  }

  set priority(value: TaskPriority | undefined) {
    this._priority = value;
  }

  get isPlannedForMyDay(): TaskIsPlannedForMyDay {
    return this._isPlannedForMyDay;
  }

  set isPlannedForMyDay(value: TaskIsPlannedForMyDay) {
    this._isPlannedForMyDay = value;
  }
}
