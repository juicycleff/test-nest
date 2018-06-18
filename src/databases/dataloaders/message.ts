import { getDirectMessages, getMessagesByChannel } from '../aql/message';
// tslint:disable-next-line:no-var-requires
const DataLoader = require('dataloader');

export const getDirectMessage = new DataLoader((data: any) => getDirectMessages(data[0].id, data[0].next));
export const getMessage = new DataLoader((data: any) => getMessagesByChannel(data[0].id, data[0].next));