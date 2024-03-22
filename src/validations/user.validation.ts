import * as Joi from 'joi';

export const createUser = Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string(),
    role: Joi.string().required().valid('user', 'admin'),
  }).min(1)

export const loginUser = Joi.object().keys({
  email: Joi.string().email(),
  password: Joi.string(),
})
