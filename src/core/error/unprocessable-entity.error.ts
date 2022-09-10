import { ApolloError } from 'apollo-server-express';

export class UnprocessableEntityError extends ApolloError {
  constructor(message: string, extensions?: Record<string, any>) {
    super(message, 'UNPROCESSABLE_ENTITY', extensions);

    Object.defineProperty(this, 'name', { value: 'UnprocessableEntityError' });
  }
}
