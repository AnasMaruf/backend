import { prismaClient } from "../src/application/database";
import bcrypt from "bcrypt";

const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      email: "test@gmail.com",
    },
  });
};

const removeTestProduct = async () => {
  await prismaClient.product.deleteMany({
    where: {
      email_user: "test@gmail.com",
    },
  });
};

const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      email: "test@gmail.com",
      username: "test",
      password: await bcrypt.hash("test123", 10),
      token: "test",
    },
  });
};

const getTestUser = async () => {
  return prismaClient.user.findFirst({
    where: {
      email: "test@gmail.com",
    },
  });
};

const createTestProduct = async () => {
  await prismaClient.product.create({
    data: {
      name: "test",
      price: 4000,
      description: "test",
      email_user: "test@gmail.com",
    },
  });
};

const getTestProduct = async () => {
  return prismaClient.product.findFirst({
    where: {
      email_user: "test@gmail.com",
    },
  });
};

export {
  removeTestUser,
  removeTestProduct,
  createTestUser,
  createTestProduct,
  getTestProduct,
  getTestUser,
};
