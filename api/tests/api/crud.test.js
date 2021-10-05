process.env.NODE_ENV = "test";
const http = require("http");
const request = require("supertest");
const app = require("../../src/app.ts");
const server = require("../../src/index.ts");
const getBooks = jest.mock("../../src/controllers/books.controllers");

describe("CRUD operations", () => {
  let mockToken = null;

  test("should register a user", async () => {
    const res = await request.agent(server).post("/api/signup").send({
      name: "testeando",
      email: "testeando@gmail.com",
      password: "1234567",
    });

    mockToken = res.body.token;

    expect(res.body).toEqual({
      ok: true,
      name: "testeando",
      uid: expect.any(String),
      token: expect.any(String),
    });
  });

  let mockBookId = null;

  test("should post a book", async () => {
    let bookTitle = "The Little Prince";

    const res = await request
      .agent(server)
      .set("Authorization", `Bearer ${mockToken}`)
      .post("/api/book")
      .send({
        title: bookTitle,
        status: "to be read",
      });

    mockBookId = res.body.doc._id;

    expect(res.body.ok).toBe(true);
    expect(res.body.msg).toBe("Book saved");
    expect(res.body.doc.title).toBe(bookTitle);
  });

  test("should update a book", async () => {
    let bookTitle = "The Little Prince";

    const res = await request
      .agent(server)
      .set("Authorization", `Bearer ${mockToken}`)
      .put(`/api/book/${mockBookId}`)
      .send({
        status: "completed",
      });

    const { updated } = res.body;

    expect(updated.status).toBe("completed");
    expect(updated.title).toBe(bookTitle);
  });

  test("should delete a book", async () => {
    const res = await request
      .agent(server)
      .set("Authorization", `Bearer ${mockToken}`)
      .delete(`/api/book/${mockBookId}`);

    const { ok, remove } = res.body;

    expect(ok).toBe(true);
    expect(remove._id).toBe(mockBookId);
  });
});
