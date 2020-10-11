import {Rol} from './rol';
import {Department} from './department';

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
  department: Department;
}

export interface UserTable {
  id: number;
  username: string;
  email: string;
  name: string;
  last_name: string;
  rol: string;
  department: string;
}

export interface PostUser {
  username: string;
  email: string;
  password: string;
  name: string;
  last_name: string;
  rol: any;
  department: any;
}
