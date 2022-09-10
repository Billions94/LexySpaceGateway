import { ParameterHandler } from '../parameter-handler';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ParameterHandlerFactoryService {
  createParameterHandler(): ParameterHandler {
    return new ParameterHandler();
  }
}
