import CodeList from "./codeList";

export type TaskStatusCode = string;

export type TaskStatusName = string;

export default class TaskStatus extends CodeList<
  TaskStatusCode,
  TaskStatusName
> {}
