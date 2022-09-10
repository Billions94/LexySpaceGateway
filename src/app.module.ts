import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApiModule } from './api/api.module';
import { CoreModule } from './core/core.module';
import { PostModule } from './post/post.module';
import { ApolloServerPluginCacheControl } from 'apollo-server-core';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { ReplyModule } from './reply/reply.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.gql'],
      plugins: [
        ApolloServerPluginCacheControl({ defaultMaxAge: 31 }),
      ],
      debug: true,
    }),
    ,
    ApiModule,
    CoreModule,
    PostModule,
    UserModule,
    CommentModule,
    ReplyModule,
  ],
})
export class AppModule {}


