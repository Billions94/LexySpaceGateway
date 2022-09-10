export interface ParameterHandlerInterface {
  append(name: string, value: any): void;

  getParams(): any;
}
