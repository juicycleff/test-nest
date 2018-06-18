import { createMyChannel, getOneChannel, getChannelsByCommunity } from '../aql/channel';
// tslint:disable-next-line:no-var-requires
const DataLoader = require('dataloader');

export const myArticles = new DataLoader((data: any) => getOneChannel(data[0].id));
export const getArticle = new DataLoader((data: any) => getChannelsByCommunity(data[0].id));
export const getActivity = new DataLoader((data: any) => createMyChannel(data[0].id, data[0].data));