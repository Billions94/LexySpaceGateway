import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { AppLoggerConfig } from './app-logger.config';

/**
 * CoreLogger
 *
 * Opt-In for sentry:
 *  - add config object { logToSentry: true } as 2nd param to Logger.error()/warn()
 *  - context/stack params can follow as defined in LoggerService interface
 *
 *  @Example: Logger.error('message', { logToSentry: true }, 'stack', 'context');
 */
@Injectable()
export class AppLogger extends ConsoleLogger implements LoggerService {
  constructor() {
    super();
  }

  warn(message: any, ...optionalParams: [...any, string?, string?]) {
    const loggerConfig = this.parseLoggerConfig(optionalParams);
    const context = this.parseContext(optionalParams);

    if (loggerConfig?.logToSentry) {
      this.logToSentry(message, 'warning', context);
    }

    super.warn(message, ...optionalParams);
  }

  error(message: any, ...optionalParams: [...any, string?, string?]) {
    const loggerConfig = this.parseLoggerConfig(optionalParams);
    const context = this.parseContext(optionalParams);

    if (loggerConfig?.logToSentry) {
      this.logToSentry(message, 'error', context);
    }

    super.error(message, ...optionalParams);
  }

  private logToSentry(
    message: any,
    level: Sentry.SeverityLevel,
    context?: string
  ) {
    const scope = new Sentry.Scope();
    scope.setLevel(level);
    scope.setContext('Application', { 'context': context });

    Sentry.captureMessage(message, scope);
  }

  private parseLoggerConfig(
    optionalParams: [...any, string?, string?]
  ): AppLoggerConfig | null {
    const param = optionalParams[0];

    if (typeof param === 'object' && param.logToSentry !== undefined) {
      return optionalParams.shift();
    }

    return null;
  }

  private parseContext(
    optionalParams: [...any, string?, string?]
  ): string | undefined {
    return optionalParams[optionalParams.length - 1];
  }
}
