import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApiModule } from './api/api.module';
import { CoreModule } from './core/core.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { ReplyModule } from './reply/reply.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SessionModule } from './session/session.module';
import { ApolloServerPluginCacheControl } from 'apollo-server-core';
import responseCachePlugin from 'apollo-server-plugin-response-cache';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      context: ({ req }) => ({ req }),
      typePaths: ['./**/*.gql'],
      plugins: [
        ApolloServerPluginCacheControl({ defaultMaxAge: 0 }),
        responseCachePlugin(),
      ],
      installSubscriptionHandlers: true,
      debug: true,
      subscriptions: {
        'subscriptions-transport-ws': true,
      },
    }),
    ApiModule,
    CoreModule,
    PostModule,
    UserModule,
    CommentModule,
    ReplyModule,
    AuthModule,
    SessionModule,
    // PubsubModule,
  ],
})
export class AppModule {}
