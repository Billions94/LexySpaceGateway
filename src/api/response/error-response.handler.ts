import { ErrorMessage } from '../../core/error/error-message';
import { ApolloError } from 'apollo-server-express';

export class ErrorResponseHandler {
  private readonly apiError: ApolloError;

  private errorMessages: ErrorMessage[] = [];

  constructor(error: ApolloError) {
    this.apiError = error;
  }

  getErrorMessage(): string {
    const responseErrors = this.getErrors();
    let errorMessage = 'Unknown api error.';

    if (responseErrors.length > 0) {
      // Set from an error message array
      errorMessage = responseErrors[0].message;
    }

    return errorMessage;
  }

  getErrorExtension(): Record<string, ErrorMessage[]> {
    return {
      errors: this.getErrors(),
    };
  }

  getErrors(): ErrorMessage[] {
    let responseErrors: any[] = [];

    if (this.apiError) {
      responseErrors = [this.apiError];
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
