import siteMetadata from 'content/siteMetadata'
import { getAllPosts } from '@/lib/notion'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = siteMetadata.siteUrl
  const allBlogs = await getAllPosts()
  const blogRoutes = allBlogs.map((post) => ({
    url: `${siteUrl}/${post.slug}`,
    lastModified: post.lastmod || post.date,
  }))

  const routes = ['', 'blog', 'repos', 'tags', 'about'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogRoutes]
}
