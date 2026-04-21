import AuthorLayout from '@/layouts/MDX/AuthorLayout'
import MainLayout from '@/layouts/MainLayout'
import { components } from '@/components/MDXComponents'
import { MDXRemote } from 'next-mdx-remote/rsc'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export const metadata = {
  title: 'About - Ikboljon Abdurasulov',
  description: 'More about - IkboljonMe',
}

export default function About() {
  const authorFile = path.join(process.cwd(), 'content', 'authors', 'about.mdx')
  const raw = fs.readFileSync(authorFile, 'utf-8')
  const { data, content } = matter(raw)

  return (
    <MainLayout>
      <AuthorLayout content={data as any}>
        <MDXRemote source={content} components={components} />
      </AuthorLayout>
    </MainLayout>
  )
}
