import Joi from "joi";

const createProductValidation = Joi.object({
  name: Joi.string().max(100).required(),
  price: Joi.number().positive().required(),
  description: Joi.string().max(500).required(),
});
const getProductValidation = Joi.string().email().required();
const getIdProductValidation = Joi.number().positive().required();
const updateProductValidation = Joi.object({
  id: Joi.number().positive().required(),
  name: Joi.string().max(100).required(),
  price: Joi.number().positive().required(),
  description: Joi.string().max(500).required(),
});

export {
  createProductValidation,
  getProductValidation,
  getIdProductValidation,
  updateProductValidation,
};
