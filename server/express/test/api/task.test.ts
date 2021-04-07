import app from "../../src/app";
import supertest from "supertest";

describe("The API server", () => {
  const request = supertest(app);

  it("can read a single task by ID", async () => {
    const { body } = await request.get("/beta/Tasks/1").expect(200);
    expect(body).toMatchSnapshot();
  });

  it("cannot read a task by an unknown ID", async () => {
    await request.get("/beta/Tasks/99").expect(404);
  });

  it("can read all tasks", async () => {
    const { body } = await request.get("/beta/Tasks").expect(200);
    expect(body).toEqual({
      value: expect.arrayContaining([expect.objectContaining({ id: 1 })]),
    });
  });

  it("can filter tasks by collection", async () => {
    const { body } = await request.get("/beta/Tasks?collection=42").expect(200);
    expect(body).toMatchSnapshot();
  });
});
