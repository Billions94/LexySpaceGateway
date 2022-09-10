import { Module } from '@nestjs/common';
import { REST_DATASOURCE } from '../core/rest/rest-datasource.interface';
import { CoreModule } from '../core/core.module';
import { ApiDatasourceDecorator } from './api-datasource.decorator';
import { RequestHandlerFactoryService } from './request/request-handler-factory.service';
import { RestCache } from '../core/rest/rest-cache';

@Module({
  imports: [CoreModule],
  providers: [
    { provide: REST_DATASOURCE, useClass: ApiDatasourceDecorator },
    RequestHandlerFactoryService,
    RestCache,
  ],
})
export class ApiModule {}
