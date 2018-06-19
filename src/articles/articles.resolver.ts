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

import { ArticlesService } from './articles.service';
import { findFollowers } from '../databases/dataloaders/user';
import { getUserId } from '../common/utils';
import { findOneDocument } from '../databases/dataloaders';
import { myArticles, getActivity } from '../databases/dataloaders/article';
import { getMyActivity } from 'databases/aql/article';

const pubSub = new PubSub();

@Resolver('Article')
export class ArticlesResolvers {
  constructor(private readonly articleService: ArticlesService) { }

  /*
   * Resolver Properties
  @ResolveProperty('followers')
  async followers(obj, args: any, context, info): Promise<User> {
    return null;
  }

  @ResolveProperty('following')
  async following(obj, args: any, context, info): Promise<User> {
    return null;
  }

  @ResolveProperty('isFollowing')
  async isFollowing(obj, args: any, context, info): Promise<boolean> {
    return null;
  }

  @ResolveProperty('connections')
  async connections(obj, args: any, context, info): Promise<User> {
    return null;
  }

  @ResolveProperty('communities')
  async communities(obj, args: any, context, info): Promise<User> {
    return null;
  }

  @ResolveProperty('isOnline')
  async isOnline(obj, args: any, context, info): Promise<boolean> {
    return null;
  }
  */

  @Query()
  async articles(parent: any, args: any, ctx: any, info: any) {
    const id = getUserId(ctx);
    const data = { id, next: false };
    const articles = await myArticles.load(data);

    return articles;
  }

  @Query()
  async activity(parent: any, {username, skip}, ctx: any) {

    const data = { username, skip };
    const user = await getActivity.load(data);

    return user;
  }

  @ResolveProperty('userFavourited')
  async userFavouritedProps(user: any, args: any, context: any) {
    // const id = getUserId(context);
    const data = {
      id: user._id,
      next: false,
    };
    const following = await findFollowers.load(data);
    return following;
  }

  @ResolveProperty('comments')
  async commentsProps(user: any, args: any, context: any) {
    // const id = getUserId(context);
    const data = {
      id: user._id,
      next: false,
    };
    const following = await findFollowers.load(data);
    return following;
  }

  @ResolveProperty('author')
  async authorProps(user: any, args: any, context: any) {
    // const id = getUserId(context);
    const data = {
      id: user._id,
      next: false,
    };
    const following = await findFollowers.load(data);
    return following;
  }

  @ResolveProperty('likes')
  async likesProps(user: any, args: any, context: any) {
    // const id = getUserId(context);
    const data = {
      id: user._id,
      next: false,
    };
    const following = await findFollowers.load(data);
    return following;
  }

  @ResolveProperty('category')
  async categoryProps(user: any, args: any, context: any) {
    // const id = getUserId(context);
    const data = {
      id: user._id,
      next: false,
    };
    const following = await findFollowers.load(data);
    return following;
  }
}
