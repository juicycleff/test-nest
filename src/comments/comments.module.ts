import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolvers } from './comments.resolver';

@Module({
  providers: [ CommentsService, CommentsResolvers ],
})
export class CommentsModule {}