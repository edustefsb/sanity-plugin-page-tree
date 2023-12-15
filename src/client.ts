import { PageTreeConfig, SitemapPage } from './types';
import { getSitemap } from './helpers/page-tree';
import { getPageInfoQuery } from './queries';
import { SanityClient } from 'sanity';

export type { SitemapPage } from './types';

export type PageTreeClientOptions = {
  config: PageTreeConfig;
  client: SanityClient;
};

export const createPageTreeClient = ({ config, client }: PageTreeClientOptions) => {
  return new PageTreeClient(config, client);
};

class PageTreeClient {
  private readonly config: PageTreeConfig;
  private readonly client: SanityClient;

  constructor(config: PageTreeConfig, client: SanityClient) {
    this.config = config;
    this.client = client;
  }

  async getSitemap(): Promise<SitemapPage[]> {
    const pageInfos = await this.client.fetch(getPageInfoQuery(this.config));
    return getSitemap(this.config, pageInfos);
  }
}
