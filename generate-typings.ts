// Generates base types from graphql schema files

import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./src/**/*.gql'],
  path: join(process.cwd(), 'src/dto/index.ts'),
  outputAs: 'class',
  emitTypenameField: true,
  skipResolverArgs: true,
});
