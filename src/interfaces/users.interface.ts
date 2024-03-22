import { TokenData } from "./auth.interface";
export interface UserInterface {
  _id: string;
  email: string;
  password: string;
  role: string,
  token?: TokenData
}

export interface LoginInterface {

  email: string;
  password: string;
 
}
 