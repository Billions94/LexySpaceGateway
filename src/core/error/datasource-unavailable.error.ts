import { ApolloError } from 'apollo-server-express';
import { apolloErrorCodes } from './apollo-error-codes';

export class DatasourceUnavailableError extends ApolloError {
  constructor(message: string) {
    super(message, apolloErrorCodes.DATASOURCE_UNAVAILABLE);

    Object.defineProperty(this, 'name', {
      value: 'DatasourceUnavailableError',
    });
  }
}
