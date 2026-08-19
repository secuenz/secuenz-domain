// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://secuenz.com',
  integrations: [sitemap()],
  build: {
    // Emit /about/index.html rather than /about.html so URLs keep their
    // trailing slash on GitHub Pages, matching the pre-migration site.
    format: 'directory',
  },
});
