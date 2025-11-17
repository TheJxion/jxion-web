import { createContentManager, type ContentManagerOptions } from '@jxion/core';
import { CONTENT_API_BASE } from '$lib/config/env';

export const createNoirContentManager = (options?: ContentManagerOptions) => {
  return createContentManager({
    baseUrl: CONTENT_API_BASE,
    ...options,
  });
};
