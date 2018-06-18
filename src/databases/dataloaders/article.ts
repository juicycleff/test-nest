import { getMyArticles, getOneArticle, getMyActivity, getMyTimeline, getMyDrafts, getMyPublishedArticles, getMySavedArticles } from '../aql/article';
// tslint:disable-next-line:no-var-requires
const DataLoader = require('dataloader');

export const myArticles = new DataLoader((data: any) => getMyArticles(data[0].id, data[0].next));
export const getArticle = new DataLoader((data: any) => getOneArticle(data[0]));
export const getActivity = new DataLoader((data: any) => getMyActivity(data[0].username, data[0].skip));
export const getTimeline = new DataLoader((data: any) => getMyTimeline(data[0].id, data[0].next));
export const getDrafts = new DataLoader((data: any) => getMyDrafts(data[0].id, data[0].next));
export const getPublishedArticles = new DataLoader((data: any) => getMyPublishedArticles(data[0].id, data[0].next));
export const getSavedArticles = new DataLoader((data: any) => getMySavedArticles(data[0].id, data[0].next));