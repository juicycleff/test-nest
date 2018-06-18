import { Article } from 'articles/interfaces/articles.interface';
import { User } from 'users/interfaces';

export interface Comment {
  _id: string;
  _key: string;
  createdAt: Date;
  updatedAt: Date;
  body?: string;
  replies?: Comment[];
  article: Article;
  author: User;
  reactions?: User [];
  reacted: boolean;
  isAuthor: boolean;
  replied: boolean;
}