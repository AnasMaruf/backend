import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import { createTestUser, removeTestUser } from "./test-util";

describe("POST /api/users", () => {
  afterEach(async () => {
    await removeTestUser();
  });

  it("Should can register user", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "test",
      email: "test@gmail.com",
      password: "test123",
      confPassword: "test123",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.email).toBe("test@gmail.com");
    expect(result.body.data.password).toBeUndefined();
  });

  it("Should reject if request is invalid", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "",
      email: "",
      password: "",
      confPassword: "",
    });
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("Should reject if email is already", async () => {
    let result = await supertest(web).post("/api/users").send({
      username: "test",
      email: "test@gmail.com",
      password: "test123",
      confPassword: "test123",
    });
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.email).toBe("test@gmail.com");
    expect(result.body.data.password).toBeUndefined();

    result = await supertest(web).post("/api/users").send({
      username: "test",
      email: "test@gmail.com",
      password: "test123",
      confPassword: "test123",
    });
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("Should reject if password and confirm password do not match", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "test",
      email: "test@gmail.com",
      password: "test123",
      confPassword: "password",
    });
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("POST /api/users/login", () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("Should can login", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      email: "test@gmail.com",
      password: "test123",
    });
    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
    expect(result.body.data.token).not.toBe("test");
  });

  it("Should reject if email or password wrong", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      email: "testo@gmail.com",
      password: "test123",
    });
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });

  it("Should reject if email or password is invalid", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      email: "test@gmail",
      password: "",
    });
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});
