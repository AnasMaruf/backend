import Joi from "joi";

const registerUserValidation = Joi.object({
  username: Joi.string().max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().max(100).required(),
});

const loginUserValidation = Joi.object({
  // id: Joi.number().positive().required(),
  username: Joi.string().max(100).required(),
  // email: Joi.string().email().required(),
  password: Joi.string().max(100).required(),
});

export { registerUserValidation, loginUserValidation };
