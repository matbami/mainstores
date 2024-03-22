import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { CreateUserDto, loginUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { LoginInterface, UserInterface } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';

class AuthService {
  public users = userModel;
  public async signUp(userData: UserInterface): Promise<UserInterface> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: UserInterface = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: UserInterface = await this.users.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async login(userData: LoginInterface): Promise<{findUser: LoginInterface, token: TokenData}> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');
    const findUser: UserInterface = await this.users.findOne({ email: userData.email });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching');

    const tokenData = this.createToken(findUser);
    findUser.token = tokenData
   
    return  { findUser, token:tokenData};
  }

  // public async updateUser(productId: string, productData: Product): Promise<Product> {
  //   if (isEmpty(productData)) throw new HttpException(400, "productData is empty");

  //   if (productData.name) {
  //     const findProduct: Product = await this.product.findOne({ name: productData.name });
  //     if (findProduct) throw new HttpException(409, `This product ${productData.name} already exists`);
  //   }

  //   if (userData.password) {
  //     const hashedPassword = await hash(userData.password, 10);
  //     userData = { ...userData, password: hashedPassword };
  //   }

  //   const updateUserById: Product = await this.users.findByIdAndUpdate(userId, { userData });
  //   if (!updateUserById) throw new HttpException(409, "User doesn't exist");

  //   return updateUserById;
  // }

  // public async logout(userData: UserInterface): Promise<UserInterface> {
  //   if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

  //   const findUser: UserInterface = await this.users.findOne({ email: userData.email, password: userData.password });
  //   if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

  //   return findUser;
  // }

  public createToken(user: UserInterface): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

}

export default AuthService;
