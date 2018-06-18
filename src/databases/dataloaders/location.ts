import { userWithInRange } from '../aql/location';
// tslint:disable-next-line:no-var-requires
const DataLoader = require('dataloader');

export const getUserWithinRange = new DataLoader((data: any) =>
 userWithInRange(data[0].lng, data[0].lat, data[0].range, data[0].offset));