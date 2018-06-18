import { User } from 'users/interfaces';
import { Article } from 'articles/interfaces/articles.interface';

export interface Interest {
  _id: string;
  _key: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  avatar: string;
  users?: User[];
  articles?: Article[];
  following?: boolean;
}