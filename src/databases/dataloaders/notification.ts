import { getMyNotifications } from '../aql/notification';
// tslint:disable-next-line:no-var-requires
const DataLoader = require('dataloader');

export const getNotifications = new DataLoader((data: any) => getMyNotifications(data[0].id, data[0].next));