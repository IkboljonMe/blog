import { writeFileSync, mkdirSync } from 'fs'
import path from 'path'
import GithubSlugger from 'github-slugger'
import { escape } from './htmlEscaper.mjs'
import siteMetadata from '../content/siteMetadata.js'

async function fetchAllPosts() {
  const { Client } = await import('@notionhq/client')
  const { NotionToMarkdown } = await import('notion-to-md')

  const notion = new Client({ auth: process.env.NOTION_TOKEN })
  const n2m = new NotionToMarkdown({ notionClient: notion })

  const databaseId = process.env.NOTION_BLOG_DATABASE_ID
  if (!databaseId) {
    console.warn('NOTION_BLOG_DATABASE_ID is not set — skipping RSS generation.')
    return []
  }

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: { property: 'Draft', checkbox: { equals: false } },
    sorts: [{ property: 'Date', direction: 'descending' }],
  })

  return Promise.all(
    response.results.map(async (page) => {
      const props = page.properties
      const title = props['Title']?.title?.map((r) => r.plain_text).join('') ?? ''
      const slug = props['Slug']?.rich_text?.map((r) => r.plain_text).join('') || page.id
      const dateRaw = props['Date']?.date?.start ?? null
      const date = dateRaw ? new Date(dateRaw).toISOString() : new Date().toISOString()
      const summary = props['Summary']?.rich_text?.map((r) => r.plain_text).join('') || ''
      const tags = props['Tags']?.multi_select?.map((t) => t.name) ?? []
      return { slug, title, date, summary, tags, draft: false }
    })
  )
}

function getAllTags(allBlogs) {
  const tagCount = {}
  allBlogs.forEach((file) => {
    if (file.tags && file.draft !== true) {
      file.tags.forEach((tag) => {
        const formattedTag = GithubSlugger.slug(tag)
        tagCount[formattedTag] = (tagCount[formattedTag] ?? 0) + 1
      })
    }
  })
  return tagCount
}

const generateRssItem = (post) => `
  <item>
    <guid>${siteMetadata.siteUrl}/blog/${post.slug}</guid>
    <title>${escape(post.title)}</title>
    <link>${siteMetadata.siteUrl}/blog/${post.slug}</link>
    ${post.summary && `<description>${escape(post.summary)}</description>`}
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>${siteMetadata.email} (${siteMetadata.author})</author>
    ${post.tags && post.tags.map((t) => `<category>${t}</category>`).join('')}
  </item>
`

const generateRss = (posts, page = 'feed.xml') => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escape(siteMetadata.title)}</title>
      <link>${siteMetadata.siteUrl}/blog</link>
      <description>${escape(siteMetadata.description)}</description>
      <language>${siteMetadata.language}</language>
      <managingEditor>${siteMetadata.email} (${siteMetadata.author})</managingEditor>
      <webMaster>${siteMetadata.email} (${siteMetadata.author})</webMaster>
      <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="${siteMetadata.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
      ${posts.map(generateRssItem).join('')}
    </channel>
  </rss>
`

async function generate() {
  const allBlogs = await fetchAllPosts()

  if (allBlogs.length > 0) {
    writeFileSync('./public/feed.xml', generateRss(allBlogs))
  }

  if (allBlogs.length > 0) {
    const tags = getAllTags(allBlogs)
    for (const tag of Object.keys(tags)) {
      const filteredPosts = allBlogs.filter(
        (post) => post.draft !== true && post.tags.map((t) => GithubSlugger.slug(t)).includes(tag)
      )
      const rss = generateRss(filteredPosts, `tags/${tag}/feed.xml`)
      const rssPath = path.join('public', 'tags', tag)
      mkdirSync(rssPath, { recursive: true })
      writeFileSync(path.join(rssPath, 'feed.xml'), rss)
    }
  }
}

generate()
