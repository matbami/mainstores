import * as Joi from 'joi';

export const validateCreateProduct = Joi.object().keys({
    name: Joi.string().required().trim(),
    description: Joi.string().optional().trim(),
    price: Joi.number().required(),
    quantity: Joi.number().required()
  }).min(1)
  export const validateUpdateProduct = Joi.object().keys({
    name: Joi.string().optional().trim(),
    description: Joi.string().optional().trim(),
    price: Joi.number().optional(),
    quantity: Joi.number().optional()
  }).min(1)


