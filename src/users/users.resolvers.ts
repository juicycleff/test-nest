import { Injectable, UseGuards } from '@nestjs/common';
import {
  Query,
  Mutation,
  Resolver,
  DelegateProperty,
  Subscription,
  ResolveProperty,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';
import { UsersGuard } from './users.guard';
import {
  checkConnectStatus,
  checkFollowerStatus,
  findConnections,
  checkFollowingStatus,
  findFollowing,
  findFollowers,
} from 'databases/dataloaders/user';
import { getUserId } from 'common/utils';

const pubSub = new PubSub();

@Resolver('User')
export class UsersResolvers {
  constructor(private readonly userService: UsersService) {}

  @Query()
  @UseGuards(UsersGuard)
  async getUsers() {
    return await this.userService.findAll();
  }

  @Mutation()
  async followUser(obj, args: User, context, info): Promise<User> {
    const createdUser = await this.userService.create(args);
    pubSub.publish('userCreated', { userCreated: createdUser });
    return createdUser;
  }

  @Mutation()
  async unFollowUser(obj, args: User, context, info): Promise<User> {
    const createdUser = await this.userService.create(args);
    pubSub.publish('userCreated', { userCreated: createdUser });
    return createdUser;
  }

  @Subscription('userCreated')
  userCreated() {
    return {
      subscribe: () => pubSub.asyncIterator('userCreated'),
    };
  }

  /**
   * Resolver Properties
   */
  @ResolveProperty('followers')
  async followers(obj, args: any, context, info): Promise<User> {
    // const id = getUserId(context);
    const data = {
      id: obj._id,
      next: false,
    };
    const following = await findFollowers.load(data);
    return following;
  }

  @ResolveProperty('following')
  async following(obj, args: any, context, info): Promise<User> {

    const data = {
      id: obj._id,
      next: false,
    };
    const following = await findFollowing.load(data);
    return following;
  }

  @ResolveProperty('isFollowing')
  async isFollowing(obj, args: any, context, info): Promise<boolean> {

    const id = getUserId(context);

    if (id !== obj._id){
      const data = {
        id,
        against: obj._id,
      };

      const following = await checkFollowingStatus.load(data);
      return following;
    }

    return false;
  }

  @ResolveProperty('connections')
  async connections(obj, args: any, context, info): Promise<User> {
    const data = {
      id: obj._id,
      next: false,
    };
    const following = await findConnections.load(data);
    return following;
  }

  @ResolveProperty('communities')
  async communities(obj, args: any, context, info): Promise<User> {
    return {
      _id: '787878',
      username: 'hjhjhjh',
      email: 'dsjdhsjhdj',
    };
  }

  @ResolveProperty('isOnline')
  async isOnline(obj, args: any, context, info): Promise<boolean> {
    return null;
  }

  @ResolveProperty('isFollower')
  async isFollower(obj, args: any, context, info): Promise<boolean> {

    const id = getUserId(context);

    if (id !== obj._id){
      const data = {
        id,
        against: obj._id,
      };

      const following = await checkFollowerStatus.load(data);
      return following;
    }

    return false;
  }

  @ResolveProperty('isConnected')
  async isConnected(obj, args: any, context, info): Promise<boolean> {
    const id = getUserId(context);

    if (id !== obj._id){
      const data = {
        id,
        against: obj._id,
      };

      const following = await checkConnectStatus.load(data);
      return following;
    }

    return false;
  }
}
