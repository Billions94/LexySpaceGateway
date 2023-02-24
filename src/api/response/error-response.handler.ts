import { ErrorMessage } from '../../core/error/error-message';
import { ApolloError } from 'apollo-server-express';

export class ErrorResponseHandler {
  private readonly glueResponseError: ApolloError;

  private errorMessages: ErrorMessage[] = [];

  constructor(error: ApolloError) {
    this.glueResponseError = error;
  }

  getErrorMessage(): string {
    const responseErrors = this.getErrors();
    let errorMessage = 'Unknown api error.';

    if (responseErrors.length > 0) {
      // Set from error message array
      errorMessage = responseErrors[0].message;
    } else if (this.glueResponseError?.extensions?.response?.body) {
      // set from body
      errorMessage = this.glueResponseError?.extensions?.response?.body;
    }

    return errorMessage;
  }

  getErrorExtension(): Record<string, ErrorMessage[]> {
    return {
      errors: this.getErrors(),
    };
  }

  getErrors(): ErrorMessage[] {
    let responseErrors = [];

    if (this.glueResponseError.extensions?.response?.body?.errors) {
      responseErrors =
        this.glueResponseError.extensions?.response?.body?.errors;
    } else if (this.glueResponseError.extensions?.errors) {
      responseErrors = this.glueResponseError.extensions?.errors;
    }

    this.errorMessages = Array.isArray(responseErrors)
      ? responseErrors.map((data: any) => this.mapErrorMessage(data))
      : [];

    return this.errorMessages;
  }

  private mapErrorMessage(data: any): ErrorMessage {
    return {
      message: data.detail ? data.detail : data.message,
      code: data.code,
      path: '',
    };
  }
}
