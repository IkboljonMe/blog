import kebabCase from '@/lib/utils/kebabCase'
import type { NotionPost } from '@/lib/notion'

export type PostCore = Omit<NotionPost, 'body' | '_raw' | '_id'>

export function dateSortDesc(a: string, b: string) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

export function sortedBlogPost(allBlogs: NotionPost[]) {
  return allBlogs.sort((a, b) => dateSortDesc(a.date, b.date)).filter((p) => p.draft === false)
}

export function coreContent(content: NotionPost): PostCore {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { body, _raw, _id, ...rest } = content
  return rest
}

export function allCoreContent(contents: NotionPost[]): PostCore[] {
  return contents.map((c) => coreContent(c))
}

export function getAllTags(allBlogs: NotionPost[]) {
  const tagCount: Record<string, number> = {}
  allBlogs.forEach((file) => {
    if (file.tags && file.draft !== true) {
      file.tags.forEach((tag) => {
        const formattedTag = kebabCase(tag)
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1
        } else {
          tagCount[formattedTag] = 1
        }
      })
    }
  })
  return tagCount
}

export type BlogLink = { slug: string; title: string }

export function formatBlogLink(blog: PostCore | null): BlogLink | undefined {
  if (blog) {
    return {
      title: blog.title,
      slug: blog.slug,
    }
  }
  return undefined
}
