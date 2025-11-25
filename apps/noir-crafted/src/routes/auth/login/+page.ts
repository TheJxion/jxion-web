import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url }) => {
  return {
    redirectUrl: url.searchParams.get('redirect') ?? '/',
  };
};
