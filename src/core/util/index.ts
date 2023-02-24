export class MapperUtil {
  static getKeyByValue(object: any, value: string): string | undefined {
    return Object.keys(object).find((key) => {
      return Array.isArray(object[key])
        ? object[key].find((data: any) => data === value)
        : object[key] === value;
    });
  }

  static getData(data: any, position = 0) {
    return Array.isArray(data) ? data[position] : data;
  }
}
