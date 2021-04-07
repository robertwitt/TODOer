import CodeList from "./codeList";

export type TaskPriorityCode = number;

export type TaskPriorityName = string;

export default class TaskPriority extends CodeList<
  TaskPriorityCode,
  TaskPriorityName
> {}
