import TaskList, { TaskListId, TaskListRef } from "../../model/taskList";
import { TaskListRepository } from "../taskList";
import { AbstractMockRepository } from "./abstract";

export default class TaskListMockRepository
  extends AbstractMockRepository
  implements TaskListRepository {
  async findRefById(id: TaskListId): Promise<TaskListRef | undefined> {
    const list = await this.findById(id);
    return Promise.resolve(list?.ref);
  }

  async getOneRef(id: TaskListId): Promise<TaskListRef> {
    const listRef = await this.findRefById(id);
    if (!listRef) {
      throw new Error(`A task list with ID ${id} does not exist`);
    }
    return listRef;
  }

  findById(id: TaskListId): Promise<TaskList | undefined> {
    return Promise.resolve(this.db.taskLists.get(id));
  }

  findAll(): Promise<TaskList[]> {
    return Promise.resolve(Array.from(this.db.taskLists.values()));
  }
}
