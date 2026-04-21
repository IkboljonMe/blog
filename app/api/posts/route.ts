import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/notion'

export async function GET() {
  const posts = await getAllPosts()
  const data = posts.map((p) => ({ slug: p.slug, title: p.title }))
  return NextResponse.json(data)
}
