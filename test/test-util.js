import { prismaClient } from "../src/application/database";
import bcrypt from "bcrypt";

const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      email: "test@gmail.com",
    },
  });
};

const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      id: 1,
      username: "test",
      email: "test@gmail.com",
      password: await bcrypt.hash("test123", 10),
      token: "test",
    },
  });
};

export { removeTestUser, createTestUser };
