import app from "../../src/app";
import supertest from "supertest";

describe("The API server", () => {
  const request = supertest(app);

  it("can read a single task by ID", async () => {
    const { body } = await request.get("/beta/Tasks/1").expect(200);
    expect(body).toMatchSnapshot();
  });
});
