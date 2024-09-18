import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginCacheControl } from 'apollo-server-core/dist/plugin/cacheControl';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { CoreModule } from './core/core.module';
import { PlanetModule } from './planet/planet.module';
import { PostModule } from './post/post.module';
import { ReplyModule } from './reply/reply.module';
import { SessionModule } from './session/session.module';
import { CloudinaryUploadModule } from './upload/cloudinaryUpload.module';
import { UserModule } from './user/user.module';

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
      persistedQueries: false,
      playground: true,
      introspection: process.env.NODE_ENV === 'development',
    }),
    ApiModule,
    CoreModule,
    PostModule,
    PlanetModule,
    UserModule,
    CommentModule,
    ReplyModule,
    AuthModule,
    SessionModule,
    CloudinaryUploadModule,
    // PubsubModule,
  ],
})
export class AppModule {}
