import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { CreateUserDto, loginUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { createUser, loginUser } from '@/validations/user.validation';


class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`, validationMiddleware(createUser), this.authController.signUp);
    this.router.post(`${this.path}login`, validationMiddleware(loginUser), this.authController.logIn);
    // this.router.post(`${this.path}logout`, authMiddleware, this.authController.logOut);
  }
}

export default AuthRoute;
