import Task from "../../src/model/task";
import TaskList, { TaskListRef, TaskListType } from "../../src/model/taskList";
import TaskPriority from "../../src/model/taskPriority";
import TaskStatus from "../../src/model/taskStatus";
import { MockDbData } from "../../src/repository/mock/db";

const emptyList = new TaskList(41, { type: TaskListType.Collection });
const lifeList = new TaskList(42, { type: TaskListType.Collection });
const myTasksRef: TaskListRef = {
  id: 1,
  title: "My Tasks",
};
const openStatus = new TaskStatus("O", "open");
const lowPriority = new TaskPriority(5, "low");

export const testData: MockDbData = {
  collections: [emptyList, lifeList],
  tasks: [
    new Task(1, {
      title: "Tax declaration",
      collection: myTasksRef,
      dueDate: "2021-05-31",
      status: openStatus,
      priority: lowPriority,
    }),
    new Task(2, {
      title: "Groceries shopping",
      collection: myTasksRef,
      status: openStatus,
      priority: lowPriority,
      isPlannedForMyDay: true,
    }),
    new Task(42, {
      title: "What is the meaning of life?",
      collection: lifeList.ref,
      status: new TaskStatus("D", "done"),
    }),
  ],
};
