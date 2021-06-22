import supertest from "supertest";
import app from "../../src/app";
import MockDb from "../../src/repository/mock/db";
import { testData } from "./testData";

describe("The API server", () => {
  const request = supertest(app);

  beforeEach(() => MockDb.instance.initializeWith(testData));

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

  it("can create a new task list", async () => {
    const { body } = await request
      .post("/beta/TaskLists")
      .send({
        title: "new list",
        color: "92FA4E",
      })
      .expect(201);
    expect(body).toMatchSnapshot();
  });

  it("can create a new task list as default", async () => {
    await request
      .post("/beta/TaskLists")
      .send({
        title: "new list",
        isDefaultCollection: true,
      })
      .expect(201);
    const { body } = await request.get("/beta/TaskLists").expect(200);
    expect(body).toMatchSnapshot();
  });

  it("cannot create a task list with invalid color", async () => {
    await request.post("/beta/TaskLists").send({ color: "WDR392" }).expect(400);
  });

  it("can update a task list's color", async () => {
    const { body } = await request
      .patch("/beta/TaskLists/1")
      .send({ color: "DDEEFF" })
      .expect(200);
    expect(body).toMatchSnapshot();
  });

  it("cannpt update a task list with invalid color", async () => {
    await request
      .patch("/beta/TaskLists/1")
      .send({ color: "EEFFGG" })
      .expect(400);
  });

  it("can delete empty task list", async () => {
    await request.delete("/beta/TaskLists/41").expect(204);
    await request.get("/beta/TaskLists/41").expect(404);
  });

  it("cannot delete task list with tasks", async () => {
    await request.delete("/beta/TaskLists/42").expect(400);
    await request.get("/beta/TaskLists/42").expect(200);
  });
});
