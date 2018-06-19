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

import { getUserId } from '../common/utils';
import { findOneDocument } from '../databases/dataloaders';
import { myArticles, getActivity } from '../databases/dataloaders/article';
import { getMyActivity } from '../databases/aql/article';
import { CommentsService } from './comments.service';
import { findFollowers } from '../databases/dataloaders/user';

const pubSub = new PubSub();

@Resolver('Comment')
export class CommentsResolvers {
  constructor(private readonly commentsService: CommentsService) { }

  @Query()
  async comments(parent: any, args: any, ctx: any, info: any) {
    const id = getUserId(ctx);
    const data = { id, next: false };
    const articles = await myArticles.load(data);

    return articles;
  }

  @Query()
  async commentsByArticle(parent: any, { articleId, skip}, ctx: any) {

    const data = { articleId, skip };
    const user = await getActivity.load(data);

    return user;
  }

  @Query()
  async comment(parent: any, { id }, ctx: any, info: any) {
    // const userId = getUserId(ctx);
    const data = { id, next: false };
    const articles = await myArticles.load(data);

    return articles;
  }

  @Query()
  async replies(parent: any, { articleId, skip}, ctx: any) {

    const data = { articleId, skip };
    const user = await getActivity.load(data);

    return user;
  }

  @Mutation()
  async createComment(parent: any, { article, body}, ctx: any) {

    const data = { article, body };
    const user = await getActivity.load(data);

    return user;
  }

  @Mutation()
  async deleteComment(parent: any, { id }, ctx: any) {

    const data = { id };
    const user = await getActivity.load(data);

    return user;
  }

  @Mutation()
  async likeComment(parent: any, { id }, ctx: any) {

    const data = { id };
    const user = await getActivity.load(data);

    return user;
  }

  @Mutation()
  async updateComment(parent: any, { id, body }, ctx: any) {

    const data = { id };
    const user = await getActivity.load(data);

    return user;
  }

  @Mutation()
  async unlikeComment(parent: any, { id }, ctx: any) {

    const data = { id };
    const user = await getActivity.load(data);

    return user;
  }

  @Subscription()
  async commentCreated(user: any, args: any, context: any) {
    // const id = getUserId(context);
    /*const data = {
      id: user._id,
      next: false,
    };
    const following = await findFollowers.load(data);
    */
    return null;
  }

  @Subscription()
  async commentUpdated(user: any, args: any, context: any) {
    // const id = getUserId(context);
    /*const data = {
      id: user._id,
      next: false,
    };
    const following = await findFollowers.load(data);
    return following;*/
    return null;
  }

  @ResolveProperty('replies')
  async repliesProps(user: any, args: any, context: any) {
    // const id = getUserId(context);
    const data = {
      id: user._id,
      next: false,
    };
    const following = await findFollowers.load(data);
    return following;
  }

  @ResolveProperty('article')
  async article(user: any, args: any, context: any) {
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

  @ResolveProperty('reactions')
  async reactionsProps(user: any, args: any, context: any) {
    // const id = getUserId(context);
    const data = {
      id: user._id,
      next: false,
    };
    const following = await findFollowers.load(data);
    return following;
  }

  @ResolveProperty('isAuthor')
  async isAuthor(user: any, args: any, context: any) {
    // const id = getUserId(context);
    const data = {
      id: user._id,
      next: false,
    };
    const following = await findFollowers.load(data);
    return following;
  }

  @ResolveProperty('reacted')
  async reacted(user: any, args: any, context: any): Promise<boolean|null> {
    // const id = getUserId(context);
    const data = {
      id: user._id,
      next: false,
    };
    const following = await findFollowers.load(data);
    return following;
  }
}
