import { disConnectEdge, connectEdge } from '../aql/relationship';
// tslint:disable-next-line:no-var-requires
const DataLoader = require('dataloader');

export const connectEdges = new DataLoader((data: any) => connectEdge(data[0].collectionName, data[0].documentHandle));
export const disconnectEdge = new DataLoader((data: any) => disConnectEdge(data[0].collectionName, data[0].documentHandle));