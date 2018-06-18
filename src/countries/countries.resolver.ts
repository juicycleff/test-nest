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

import { findFollowers } from 'databases/dataloaders/user';
import { getUserId } from 'common/utils';
import { findOneDocument } from 'databases/dataloaders';
import { myArticles, getActivity } from 'databases/dataloaders/article';
import { getMyActivity } from 'databases/aql/article';
import { CommentsService } from 'comments/comments.service';

const pubSub = new PubSub();

@Resolver('Country')
export class ArticlesResolvers {
  constructor(private readonly commentsService: CommentsService) { }

  @Query()
  async countries(parent: any, args: any, ctx: any, info: any) {
    const id = getUserId(ctx);
    const data = { id, next: false };
    const articles = await myArticles.load(data);

    return articles;
  }

  @Mutation()
  async createCountry(parent: any, { name }, ctx: any) {

    const data = { name };
    const user = await getActivity.load(data);

    return user;
  }
}
