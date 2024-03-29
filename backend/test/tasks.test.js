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
