import { ParameterHandlerInterface } from './parameter-handler.interface';

export class ParameterHandler implements ParameterHandlerInterface {
  private params: URLSearchParams;

  constructor() {
    this.params = new URLSearchParams();
  }

  append(name: string, value: any) {
    if (value !== undefined) {
      this.params.append(name, String(value));
    }
  }

  delete(name: string) {
    this.params.delete(name);
  }

  getParams() {
    return this.params;
  }
}
