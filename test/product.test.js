import supertest from "supertest";
import {
  createTestProduct,
  createTestUser,
  getTestProduct,
  removeTestProduct,
  removeTestUser,
} from "./test-util";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";

describe("POST /api/products", () => {
  beforeEach(async () => {
    await createTestUser();
  });
  afterEach(async () => {
    await removeTestProduct();
    await removeTestUser();
  });

  it("Should can create new product", async () => {
    const result = await supertest(web)
      .post("/api/products")
      .set("Authorization", "test")
      .send({
        name: "test",
        price: 4000,
        description: "test",
      });
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.name).toBe("test");
    expect(result.body.data.price).toBe(4000);
    expect(result.body.data.description).toBe("test");
  });

  it("Should can reject if request is invalid", async () => {
    const result = await supertest(web)
      .post("/api/products")
      .set("Authorization", "test")
      .send({
        name: "",
        price: null,
        description: "",
      });
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("Should can reject if token is not valid", async () => {
    const result = await supertest(web)
      .post("/api/products")
      .set("Authorization", "salah")
      .send({
        name: "test",
        price: 4000,
        description: "test",
      });
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/products", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestProduct();
  });
  afterEach(async () => {
    await removeTestProduct();
    await removeTestUser();
  });

  it("Should can get product", async () => {
    const result = await supertest(web)
      .get("/api/products")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(1);
  });

  it("Should reject if token is not valid", async () => {
    const result = await supertest(web)
      .get("/api/products")
      .set("Authorization", "salah");

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("PUT /api/products/:productId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestProduct();
  });
  afterEach(async () => {
    await removeTestProduct();
    await removeTestUser();
  });
  it("Should can update products", async () => {
    const productId = await getTestProduct();
    const result = await supertest(web)
      .put(`/api/products/` + productId.id)
      .set("Authorization", "test")
      .send({
        name: "test",
        price: 4000,
        description: "updated desc",
      });
    expect(result.status).toBe(200);
    expect(result.body.data.name).toBe("test");
    expect(result.body.data.price).toBe(4000);
    expect(result.body.data.description).toBe("updated desc");
  });

  it("Should reject if product is not found", async () => {
    const productId = await getTestProduct();
    const result = await supertest(web)
      .put(`/api/products/${productId.id + 1}`)
      .set("Authorization", "test")
      .send({
        name: "updated test",
        price: 5000,
        description: "updated desc",
      });
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });

  it("Should reject if token is not valid", async () => {
    const productId = await getTestProduct();
    const result = await supertest(web)
      .put(`/api/products/${productId.id}`)
      .set("Authorization", "salah")
      .send({
        name: "updated test",
        price: 5000,
        description: "updated desc",
      });
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });

  it("Should reject if request is no valid", async () => {
    const productId = await getTestProduct();
    const result = await supertest(web)
      .put(`/api/products/${productId.id}`)
      .set("Authorization", "test")
      .send({
        name: "test",
        price: 4000,
        description: "",
      });
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("DELETE /api/products/:product", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestProduct();
  });
  afterEach(async () => {
    await removeTestProduct();
    await removeTestUser();
  });

  it("Should can remove product", async () => {
    const productId = await getTestProduct();
    const result = await supertest(web)
      .delete(`/api/products/${productId.id}`)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");
  });

  it("Should reject if product is not found", async () => {
    const productId = await getTestProduct();
    const result = await supertest(web)
      .delete(`/api/products/${productId.id + 1}`)
      .set("Authorization", "test");

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });

  it("Should reject if token is not valid", async () => {
    const productId = await getTestProduct();
    const result = await supertest(web)
      .delete(`/api/products/${productId.id}`)
      .set("Authorization", "salah");

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});
