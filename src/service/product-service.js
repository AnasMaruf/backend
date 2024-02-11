import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  createProductValidation,
  getIdProductValidation,
  getProductValidation,
  updateProductValidation,
} from "../validation/product-validation.js";
import { validate } from "../validation/validation.js";

const create = async (user, request) => {
  const product = validate(createProductValidation, request);
  product.email_user = user.email;

  return prismaClient.product.create({
    data: product,
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
    },
  });
};
const list = async (user) => {
  const emailUser = validate(getProductValidation, user.email);
  const product = await prismaClient.product.findMany({
    where: {
      user: {},
    },
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
    },
  });
  if (!product) {
    throw new ResponseError(404, "Product is not found");
  }
  return product;
};

const update = async (user, request) => {
  const product = validate(updateProductValidation, request);
  const checkProduct = await prismaClient.product.count({
    where: {
      id: product.id,
      email_user: user.email,
    },
  });
  if (!checkProduct) {
    throw new ResponseError(404, "Product is not found");
  }
  return prismaClient.product.update({
    where: {
      id: product.id,
    },
    data: {
      name: product.name,
      price: product.price,
      description: product.description,
    },
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
    },
  });
};

const remove = async (user, product_id) => {
  const product = validate(getIdProductValidation, product_id);
  const checkProduct = await prismaClient.product.count({
    where: {
      id: product,
      email_user: user.email,
    },
  });
  if (checkProduct !== 1) {
    throw new ResponseError(404, "Product is not found");
  }
  await prismaClient.product.delete({
    where: {
      id: product,
    },
  });
};
export default { create, list, update, remove };
