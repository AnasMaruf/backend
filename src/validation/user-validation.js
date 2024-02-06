import Joi from "joi";

const registerUserValidation = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().max(100).required(),
  password: Joi.string().max(100).required(),
  confPassword: Joi.string()
    .max(100)
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Password and confirm password do not match",
    }),
});

const loginUserValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().max(100).required(),
});

export { registerUserValidation, loginUserValidation };
