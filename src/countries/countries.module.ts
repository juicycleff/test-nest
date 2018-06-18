import { Module } from '@nestjs/common';
import { CommentsService } from 'comments/comments.service';
import { CommentsResolvers } from 'comments/comments.resolver';

@Module({
  providers: [ CommentsService, CommentsResolvers ],
})
export class CountriesModule {}
