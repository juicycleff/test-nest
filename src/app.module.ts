import { Module, MiddlewareConsumer } from '@nestjs/common';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql';
import { MailerModule } from '@nest-modules/mailer';
import { apolloUploadExpress, GraphQLUpload  } from 'apollo-upload-server';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { MathModule } from './math/math.module';
import { ArticlesModule } from './articles/articles.module';
import { UsersModule } from './users/users.module';
import { SubscriptionsService } from './subscriptions/subscriptions.service';
import { InterestsModule } from './interests/interests.module';
import { MessagesModule } from './messages/messages.module';
import { LibrariesModule } from './libraries/libraries.module';
import { FeedsModule } from './feeds/feeds.module';
import { DepartmentsModule } from './departments/departments.module';
import { CountriesModule } from './countries/countries.module';
import { CommunitiesModule } from './communities/communities.module';
import { CommentsModule } from './comments/comments.module';
import { GraphqlModule } from './graphqls/graphqls.module';
import { DatabasesModule } from './databases/databases.module';
import {
  DateTime,
  NonPositiveInt,
  PositiveInt,
  NonNegativeInt,
  UnsignedInt,
  NegativeInt,
  NonPositiveFloat,
  PositiveFloat,
  NonNegativeFloat,
  UnsignedFloat,
  NegativeFloat,
  EmailAddress,
  URL,
  PhoneNumber,
  PostalCode,
  RegularExpression,
} from '@okgrow/graphql-scalars';
import expressPlayground from 'graphql-playground-middleware-express';
import * as GraphQLJSON from 'graphql-type-json';

const resolvers = {
  DateTime,
  NonPositiveInt,
  PositiveInt,
  NonNegativeInt,
  UnsignedInt,
  NegativeInt,
  NonPositiveFloat,
  PositiveFloat,
  NonNegativeFloat,
  UnsignedFloat,
  NegativeFloat,
  EmailAddress,
  URL,
  PhoneNumber,
  PostalCode,
  RegularExpression,
  Json: GraphQLJSON,
  Upload: GraphQLUpload,
};

@Module({
  imports: [
    DatabasesModule.forRoot({
      databaseName: 'unizonn',
      hostOdb: 'unizonn',
      loadBalancingStrategy: 'ROUND_ROBIN',
      password: 'boldbone',
      username: 'root',
      portOdb: 2450,
      url: 'http://localhost:8529',
    }),
    AuthModule,
    MailerModule.forRoot({
      transport: 'smtps://have.com:pass@smtp.gmail.com',
      defaults: {
        from: '"unizonn" <no-reply@unizonn.com>',
      },
      templateDir: './src/common/email-templates',
    }),
    SubscriptionsModule.forRoot(),
    MathModule,
    GraphQLModule,
    ArticlesModule,
    UsersModule,
    InterestsModule,
    MessagesModule,
    LibrariesModule,
    FeedsModule,
    DepartmentsModule,
    CountriesModule,
    CommunitiesModule,
    CommentsModule,
    GraphqlModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {

  /**
   * @description Construct the app module with graphql enabled
   * @param subscriptionsService takes the subscription service
   * @param graphQLFactory takes the nestjs graphql service service
   */
  constructor(
    private readonly subscriptionsService: SubscriptionsService,
    private readonly graphQLFactory: GraphQLFactory,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    const schema = this.createSchema();

    // schema._directives.push.apply(schema._directives, directives);
    // applySchemaCustomDirectives(schema);

    this.subscriptionsService.createSubscriptionServer(schema);

    consumer
      .apply(
        graphiqlExpress({
          endpointURL: '/graphql',
          subscriptionsEndpoint: `ws://localhost:3031/subscriptions`,
        }),
      )
      .forRoutes('/graphiql')
      .apply(
        expressPlayground({ endpoint: '/graphql' }),
      )
      .forRoutes('/playground')
      .apply(apolloUploadExpress())
      .forRoutes('/graphql')
      .apply(graphqlExpress(req => ({ schema, context: req, rootValue: req })))
      .forRoutes('/graphql');
  }

  createSchema() {
    const typeDefs = this.graphQLFactory.mergeTypesByPaths('./**/*.graphql');
    return this.graphQLFactory.createSchema({ typeDefs, resolvers  });
  }
}
