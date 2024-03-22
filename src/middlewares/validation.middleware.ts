import { plainToClass, plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { NextFunction, Request,  RequestHandler,  Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { createUser } from '@/validations/user.validation';
import userModel from '@/models/users.model';
import Joi from 'joi';


const validationMiddleware = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) {
      return res.status(400).json({
        error: result.error.details[0].message,
      });
    }
    if (!req.value) {
      req.value = {};
    }
    req.value['body'] = result.value;
    next();
  };
};

export default validationMiddleware;
