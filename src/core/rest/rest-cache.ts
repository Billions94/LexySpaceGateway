import { Injectable, Logger } from '@nestjs/common';
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache';

@Injectable()
export class RestCache extends InMemoryLRUCache {
  constructor() {
    super();
  }

  async get(key: string) {
    const cacheValue = await super.get(key);
    const isCached = cacheValue !== undefined;

    Logger.log(`Get resource (cached: ${isCached}): ${key}`, 'RestCache');

    return cacheValue;
  }
}
