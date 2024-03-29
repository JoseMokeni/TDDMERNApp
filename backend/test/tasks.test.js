const request = require("supertest");

const app = require("../server");

// Test the POST route

describe("POST /tasks", () => {
  it("responds with json", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({
        title: "Test Task",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            title: "Test Task",
          })
        );
      });
  });
});

// Test the GET route

describe("GET /tasks", () => {
  it("responds with json if there are tasks in the database", async () => {
    const response = await request(app)
      .get("/tasks")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        // expect either an empty array or an array of tasks with title property any string
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              title: expect.any(String),
            }),
          ])
        );
      });
  });

  it("responds with json if there are no tasks in the database", async () => {
    // delete all tasks from the database
    await request(app).delete("/tasks");

    const response = await request(app)
      .get("/tasks")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual([]);
      });
  });
});
