import supertest from "supertest";
import app from "../../src/app";
import MockDb from "../../src/repository/mock/db";

describe("The API server", () => {
  const request = supertest(app);

  beforeEach(() => MockDb.instance.reset());

  it("can read a single task list by ID", async () => {
    const { body } = await request.get("/beta/TaskLists/1").expect(200);
    expect(body).toMatchSnapshot();
  });

  it("cannot read a task list by an unknown ID", async () => {
    await request.get("/beta/TaskLists/99").expect(404);
  });

  it("can find all task lists", async () => {
    const { body } = await request.get("/beta/TaskLists").expect(200);
    expect(body).toMatchSnapshot();
  });

  it("can read a single task list with all its tasks", async () => {
    const { body } = await request
      .get("/beta/TaskLists/1/assignedTasks")
      .expect(200);
    expect(body).toMatchSnapshot();
  });

  it("can read the My Day view with all its tasks", async () => {
    const { body } = await request
      .get("/beta/TaskLists/2/assignedTasks")
      .expect(200);
    expect(body).toMatchSnapshot();
  });
});
