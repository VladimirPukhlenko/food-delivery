export interface IUser {
  _id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  orders: string[];
  __v: number;
}
