import { NextFunction, Request, Response } from 'express';
import { Product } from '@/interfaces/products.interface';
import ProductService from '@/services/product.service';
import { RequestWithUser } from '@/interfaces/auth.interface';

class ProductController {
  public productService = new ProductService();

  public getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products: Product[] = await this.productService.findAllProducts();

      res.status(200).json({ message: 'products retrieved successfully', data: products });
    } catch (error) {
      next(error);
    }
  };

  public getSingleProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId: string = req.params.id;
      const product: Product = await this.productService.getOneProduct(productId);

      res.status(200).json({ message: 'product retrieved successfully', data: product });
    } catch (error) {
      next(error);
    }
  };

  public createProduct = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const productData: Product = req.body;
      const product: Product = await this.productService.createProduct(productData,req.user._id);

      res.status(201).json({ message: 'product created successfully', data: product });
    } catch (error) {
      next(error);
    }
  };

  public updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId: string = req.params.id;
      const productData: Product = req.body;
      const product: Product = await this.productService.updateProduct(productId, productData);

      res.status(200).json({ message: 'product updated successfully', data: product });
    } catch (error) {
      next(error);
    }
  };

  public deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId: string = req.params.id;
      await this.productService.deleteProduct(productId);

      res.status(200).json({ message: 'product deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}

export default ProductController;
