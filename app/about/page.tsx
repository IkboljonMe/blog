import { MDXLayoutRenderer } from '@/components/MDXComponents'
import AuthorLayout from '@/layouts/MDX/AuthorLayout'
import MainLayout from '@/layouts/MainLayout'
import { allAuthors } from 'contentlayer/generated'

export const metadata = {
  title: 'About - Dale Larroder',
  description: 'About me - Dale Larroder',
}

export default function About() {
  const author = allAuthors.find((p) => p.slug === 'about')
  console.log(author, allAuthors, 'AUTHOR')

  if (!author) {
    return null
  }

  return (
    <MainLayout>
      <AuthorLayout content={author}>
        <MDXLayoutRenderer content={author} />
      </AuthorLayout>
    </MainLayout>
  )
}
