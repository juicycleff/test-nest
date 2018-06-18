import { createNewComment, getCommentsByArticle } from '../aql/comments';
// tslint:disable-next-line:no-var-requires
const DataLoader = require('dataloader');

export const getComments = new DataLoader((data: any) => getCommentsByArticle(data[0].id, data[0].next));
export const createComment = new DataLoader((data: any) => createNewComment(data[0].id));