import Joi from "joi";

const createdValidation = Joi.object({
  title: Joi.string().max(100).required(),
  description: Joi.string().max(100).required()
});

const taskValidation = Joi.object({
  title: Joi.string().max(100).optional(),
  description: Joi.string().max(100).optional()
});

export { taskValidation, createdValidation };
