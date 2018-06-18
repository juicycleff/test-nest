import { getMyCommunities, getOneCommunity } from '../aql/community';
// tslint:disable-next-line:no-var-requires
const DataLoader = require('dataloader');

export const getCommunities = new DataLoader((data: any) => getMyCommunities(data[0].id, data[0].next));
export const getCommunity = new DataLoader((data: any) => getOneCommunity(data[0].id));