import { Router } from 'express';
import ProductController from '@/controllers/product.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';
import { validateCreateProduct, validateUpdateProduct } from '@/validations/product.validation';

class ProductRoute implements Routes {
  public path = '/product';
  public router = Router();
  public productController = new ProductController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.productController.getProducts);
    this.router.get(`${this.path}/:id`, authMiddleware, this.productController.getSingleProduct);
    this.router.post(`${this.path}`, [authMiddleware,validationMiddleware(validateCreateProduct)], this.productController.createProduct);
    this.router.patch(`${this.path}/:id`, [authMiddleware,validationMiddleware(validateUpdateProduct)], this.productController.updateProduct);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.productController.deleteProduct);
  }
}

export default ProductRoute;
