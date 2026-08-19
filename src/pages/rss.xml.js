import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const [blog, announcements] = await Promise.all([
    getCollection('blog', ({ data }) => !data.draft),
    getCollection('announcements', ({ data }) => !data.draft),
  ]);

  const items = [
    ...blog.map((post) => ({ ...post, prefix: '/blog/' })),
    ...announcements.map((post) => ({ ...post, prefix: '/announcements/' })),
  ]
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `${post.prefix}${post.id}/`,
    }));

  return rss({
    title: 'Secuenz',
    description: 'Security assessment orchestration — writing and announcements from the ChaosEngine team.',
    site: context.site,
    items,
  });
}
