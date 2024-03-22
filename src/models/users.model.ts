import { model, Schema, Document } from 'mongoose';
import { UserInterface } from '@interfaces/users.interface';

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['admin','user']
  },
});

const userModel = model<UserInterface & Document>('User', userSchema);

export default userModel;
