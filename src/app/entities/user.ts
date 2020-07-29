import {Rol} from './rol';

export interface UserLogin {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  name: string;
  last_name: string;
  rol: Rol;
}

export interface PostUser {
  username: string;
  email: string;
  password: string;
  name: string;
  last_name: string;
  rol: any;
}
