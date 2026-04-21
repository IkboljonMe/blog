import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import readingTime from 'reading-time'
import { extractTocHeadings } from './remark-toc-headings'
import type { Toc } from 'types/Toc'

// ─── Types ───────────────────────────────────────────────────────────────────

export type NotionPost = {
  id: string
  slug: string
  title: string
  date: string
  lastmod: string | null
  tags: string[]
  summary: string | null
  draft: boolean
  author: string
  images: string[]
  readingTime: ReturnType<typeof readingTime>
  toc: Toc | undefined
  body: { raw: string }
  _raw: { flattenedPath: string }
  _id: string
}

export type CoreContent<T> = Omit<T, 'body' | '_raw' | '_id'>

// ─── Notion clients ───────────────────────────────────────────────────────────

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const n2m = new NotionToMarkdown({ notionClient: notion })

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Extract plain text from a Notion rich-text array.
 */
function richText(prop: { rich_text: { plain_text: string }[] } | undefined): string {
  return prop?.rich_text?.map((r) => r.plain_text).join('') ?? ''
}

function titleText(prop: { title: { plain_text: string }[] } | undefined): string {
  return prop?.title?.map((r) => r.plain_text).join('') ?? ''
}

// ─── Convert a raw Notion page → NotionPost ──────────────────────────────────

async function pageToPost(page: any): Promise<NotionPost> {
  const props = page.properties as Record<string, any>

  const title = titleText(props['Title'] ?? props['Name'])
  const slug = richText(props['Slug']) || page.id
  const dateRaw = props['Date']?.date?.start ?? null
  const date = dateRaw ? new Date(dateRaw).toISOString() : new Date().toISOString()
  const lastmodRaw = props['Last Modified']?.date?.start ?? null
  const lastmod = lastmodRaw ? new Date(lastmodRaw).toISOString() : null
  const draft = props['Draft']?.checkbox ?? false
  const author = richText(props['Author']) || 'default'
  const summary = richText(props['Summary']) || null
  const tags: string[] =
    props['Tags']?.multi_select?.map((t: { name: string }) => t.name) ?? []
  const coverUrl = page.cover?.external?.url ?? page.cover?.file?.url ?? null
  const images: string[] = coverUrl ? [coverUrl] : []

  // Fetch the page body from Notion blocks
  console.log(`Fetching blocks for page: ${page.id}`)
  const mdBlocks = await n2m.pageToMarkdown(page.id)
  console.log(`Converting blocks to markdown for page: ${page.id}`)
  const raw = n2m.toMarkdownString(mdBlocks).parent
  console.log(`Markdown conversion successful for page: ${page.id}`)

  const rt = readingTime(raw)
  const toc = (await extractTocHeadings(raw)) as Toc | undefined
  console.log(`Metdata extraction (reading time, TOC) successful for page: ${page.id}`)

  return {
    id: page.id,
    slug,
    title,
    date,
    lastmod,
    tags,
    summary,
    draft,
    author,
    images,
    readingTime: rt,
    toc,
    body: { raw },
    _raw: { flattenedPath: `blog/${slug}` },
    _id: page.id,
  }
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Fetch all published (non-draft) posts from Notion, sorted newest first.
 */
export async function getAllPosts(): Promise<NotionPost[]> {
  const databaseId = process.env.NOTION_BLOG_DATABASE_ID
  if (!databaseId) {
    console.warn('NOTION_BLOG_DATABASE_ID is not set — returning empty posts list.')
    return []
  }

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Draft',
      checkbox: { equals: false },
    },
    sorts: [{ property: 'Date', direction: 'descending' }],
  })

  const posts = await Promise.all(response.results.map((page) => pageToPost(page)))
  return posts
}

/**
 * Fetch a single post by its slug. Returns null if not found.
 */
export async function getPostBySlug(slug: string): Promise<NotionPost | null> {
  const databaseId = process.env.NOTION_BLOG_DATABASE_ID
  if (!databaseId) return null

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Slug',
      rich_text: { equals: slug },
    },
  })

  if (!response.results.length) return null
  return pageToPost(response.results[0])
}

/**
 * Get all unique slugs (for static generation).
 */
export async function getAllSlugs(): Promise<string[]> {
  const posts = await getAllPosts()
  return posts.map((p) => p.slug)
}
