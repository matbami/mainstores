import { HttpException } from '@exceptions/HttpException';
import { Product } from '@/interfaces/products.interface';
import productModel from '@/models/products.model';
import { isEmpty } from '@utils/util';

class ProductService {
  public product = productModel;

  public async findAllProducts(): Promise<Product[]> {
    const products: Product[] = await this.product.find();
    return products;
  }

  public async getOneProduct(productId: string): Promise<Product> {
    if (isEmpty(productId)) throw new HttpException(400, "ProductId is empty");

    const findProduct: Product = await this.product.findOne({ _id: productId });
    if (!findProduct) throw new HttpException(409, "Product doesn't exist");

    return findProduct;
  }

  public async createProduct(productData: Product, id: string): Promise<Product> {
    if (isEmpty(productData)) throw new HttpException(400, "product data is empty");

    const findProduct: Product = await this.product.findOne({ name: productData.name });
    if (findProduct) throw new HttpException(409, `This product ${productData.name} already exists`);
    productData.createdBy = id


    const product: Product = await this.product.create(productData);

    return product;
  }

  public async updateProduct(productId: string, productData: Product): Promise<Product> {
    if (isEmpty(productData)) throw new HttpException(400, "productData is empty");

    if (productData.name) {
      const findProduct: Product = await this.product.findOne({ name: productData.name });
      if (findProduct) throw new HttpException(409, `This product ${productData.name} already exists`);
    }


    const updateProductById: Product = await this.product.findByIdAndUpdate(productId, { productData });
    if (!updateProductById) throw new HttpException(409, "Product doesn't exist");

    return updateProductById;
  }

  public async deleteProduct(productId: string): Promise<Product> {
    const product: Product = await this.product.findByIdAndDelete(productId);
    if (!product) throw new HttpException(409, "Product doesn't exist");

    return product;
  }
}

export default ProductService;

