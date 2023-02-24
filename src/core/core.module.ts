import { Module } from '@nestjs/common';

import { ParameterHandlerFactoryService } from './rest/factory/parameter-handler-factory.service';
import { RestCache } from './rest/rest-cache';
import { AppLogger } from './logger/app-logger.service';

@Module({
  imports: [],
  providers: [ParameterHandlerFactoryService, RestCache, AppLogger],
  exports: [ParameterHandlerFactoryService, RestCache, AppLogger],
})
export class CoreModule {}
