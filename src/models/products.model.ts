import { model, Schema, Document } from 'mongoose';
import { Product } from '@/interfaces/products.interface';


const productSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    quantity: {
      type: Number,
      required: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
      
    },
  },
  { timestamps: true },
);

const productModel = model<Product & Document>('Product', productSchema);

export default productModel;
