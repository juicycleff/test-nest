import { getUserByEmail, getUserByUsername, getUserById, getFollowers, checkIsFollowing,
  getConnections, getFollowing, checkIsFollower, checkIsConnected,
} from '../aql/user';

// tslint:disable-next-line:no-var-requires
const DataLoader = require('dataloader');

export const findUserByEmail = new DataLoader((data: any) => getUserByEmail(data[0]));
export const findUserById = new DataLoader((data: any) => getUserById(data[0]));
export const findUserByUsername = new DataLoader((data: any) => getUserByUsername(data[0]));
export const findFollowers = new DataLoader((data: any) => getFollowers(data[0].id, data[0].next));
export const findConnections = new DataLoader((data: any) => getConnections(data[0].id, data[0].offset));
export const findFollowing = new DataLoader((data: any) => getFollowing(data[0].id, data[0].next));
export const checkFollowerStatus = new DataLoader((data: any) => checkIsFollower(data[0].id, data[0].against));
export const checkFollowingStatus = new DataLoader((data: any) => checkIsFollowing(data[0].id, data[0].against));
export const checkConnectStatus = new DataLoader((data: any) => checkIsConnected(data[0].id, data[0].against));