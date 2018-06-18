import { Module } from '@nestjs/common';
import { ArticlesResolvers } from './articles.resolver';
import { ArticlesService } from './articles.service';

@Module({
  providers: [ArticlesService, ArticlesResolvers],
})
export class ArticlesModule {}
