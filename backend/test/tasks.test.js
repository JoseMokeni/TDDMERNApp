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

describe("GET /tasks/:id", () => {
  it("responds with json", async () => {
    // add a task to the database
    const response = await request(app)
      .post("/tasks")
      .send({
        title: "Test Task",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .then((response) => {
        const taskId = response.body._id;
        return taskId;
      });

    // get the task by id
    const response2 = await request(app)
      .get(`/tasks/${response}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            title: "Test Task",
          })
        );
      });
  });

  it("responds with 400 if the id is invalid", async () => {
    // get a task by an invalid id
    const response = await request(app)
      .get(`/tasks/aaaa`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            error: expect.any(String),
          })
        );
      });
  });

  it("responds with 404 if the task is not found", async () => {
    // get a task by an id that does not exist
    const response = await request(app)
      .get(`/tasks/60e7c9b7d3f5e9f8b8b4e9e1`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            error: "Task not found",
          })
        );
      });
  });
});

// Test the DELETE route

describe("DELETE /tasks", () => {
  it("responds with 204", async () => {
    const response = await request(app).delete("/tasks").expect(204);

    // check if the database is empty
    const response2 = await request(app)
      .get("/tasks")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual([]);
      });
  });
});

describe("DELETE /tasks/:id", () => {
  it("responds with 204", async () => {
    // add a task to the database
    const response = await request(app)
      .post("/tasks")
      .send({
        title: "Test Task",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .then((response) => {
        const taskId = response.body._id;
        return taskId;
      });

    // delete the task by id
    const response2 = await request(app)
      .delete(`/tasks/${response}`)
      .expect(204);

    // check if the task is deleted
    const response3 = await request(app)
      .get(`/tasks/${response}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            error: "Task not found",
          })
        );
      });
  });
});

// Test the PUT route

describe("PUT /tasks/:id", () => {
    it("responds with 200", async () => {
        // add a task to the database
        const response = await request(app)
        .post("/tasks")
        .send({
            title: "Test Task",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201)
        .then((response) => {
            const taskId = response.body._id;
            return taskId;
        });
    
        // update the task by id
        const response2 = await request(app)
        .put(`/tasks/${response}`)
        .send({
            title: "Updated Task",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
            expect.objectContaining({
                title: "Updated Task",
            })
            );
        });
    });
    
    it("responds with 400 if the id is invalid", async () => {
        // update a task by an invalid id
        const response = await request(app)
        .put(`/tasks/aaaa`)
        .send({
            title: "Updated Task",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)
        .then((response) => {
            expect(response.body).toEqual(
            expect.objectContaining({
                error: expect.any(String),
            })
            );
        });
    });
    
    it("responds with 404 if the task is not found", async () => {
        // update a task by an id that does not exist
        const response = await request(app)
        .put(`/tasks/60e7c9b7d3f5e9f8b8b4e9e1`)
        .send({
            title: "Updated Task",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(404)
        .then((response) => {
            expect(response.body).toEqual(
            expect.objectContaining({
                error: "Task not found",
            })
            );
        });
    });
    });
