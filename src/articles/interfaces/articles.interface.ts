import { User } from '../../users/interfaces';
import { Interest } from '../../interests/interfaces/interest.interface';

export interface Article {
  _id: string;
  _key: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  archived: boolean;
  deleted: boolean;
  title?: string;
  body?: string;
  headerImage?: string[];
  tags: string[];
  category: Interest;
  type: string;
  description?: string;
  author: User;
  viewCount: number;
  likes: User[];
  comments: Comment[];
  userFavourited: User[];
}