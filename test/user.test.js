import supertest from "supertest";
import { web } from "../src/application/web";
import { prismaClient } from "../src/application/database";
import { logger } from "../src/application/logging";

describe("POST /api/users", () => {
  afterEach(async () => {
    await prismaClient.user.deleteMany({
      where: {
        username: "test",
      },
    });
  });
  it("Should can register user", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "test",
      email: "test@gmail.com",
      password: "test123",
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
    });
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
  it("Should reject if username is already", async () => {
    let result = await supertest(web).post("/api/users").send({
      username: "test",
      email: "test@gmail.com",
      password: "test123",
    });
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.email).toBe("test@gmail.com");
    expect(result.body.data.password).toBeUndefined();

    result = await supertest(web).post("/api/users").send({
      username: "test",
      email: "test@gmail.com",
      password: "test123",
    });
    logger.error(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});
