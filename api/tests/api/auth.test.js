process.env.NODE_ENV = "test";
const http = require("http");
const request = require("supertest");
const app = require("../../src/app.ts");
const server = require("../../src/index.ts");

describe("API Auth signup", () => {


  it("Testing to see if Jest works", () => {
    expect(1).toBe(1);
  });



  it("should register a user", async () => {
    const res = await request.agent(server).post("/api/signup").send({
      name: "testeando",
      email: "testeando@gmail.com",
      password: "1234567",
    });

    expect(res.body).toEqual({
      ok: true,
      name: "testeando",
      uid: expect.any(String),
      token: expect.any(String),
    });
  });

  it("should signin a user", async () => {
    const res = await request.agent(server).post("/api/signin").send({
      email: "testeando@gmail.com",
      password: "1234567",
    });

    expect(res.body).toEqual({
      ok: true,
      user: expect.any(String),
      uid: expect.any(String),
      token: expect.any(String),
    });
  });
});
