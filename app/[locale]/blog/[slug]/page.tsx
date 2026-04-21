import { MDXRemote } from 'next-mdx-remote/rsc'
import PageTitle from '@/components/PageTitle'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import PostLayout from '@/layouts/MDX/PostLayout'
import MainLayout from '@/layouts/MainLayout'
import { components } from '@/components/MDXComponents'
import { coreContent, formatBlogLink, sortedBlogPost } from '@/lib/utils/contentlayer'
import { getAllPosts, getPostBySlug } from '@/lib/notion'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.summary ?? undefined,
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const allPosts = await getAllPosts()
  const sortedPosts = sortedBlogPost(allPosts)

  const post = await getPostBySlug(params.slug)

  const postIndex = sortedPosts.findIndex((p) => p.slug === params.slug)
  const prevContent = sortedPosts[postIndex + 1] || null
  const prev = prevContent ? formatBlogLink(coreContent(prevContent)) : undefined
  const nextContent = sortedPosts[postIndex - 1] || null
  const next = nextContent ? formatBlogLink(coreContent(nextContent)) : undefined

  return (
    <>
      <ScrollProgressBar />
      <MainLayout>
        {post && post.draft !== true ? (
          <PostLayout content={coreContent(post)} prev={prev} next={next}>
            <MDXRemote source={post.body.raw} components={components} />
          </PostLayout>
        ) : (
          <div className="mt-24 text-center">
            <PageTitle>
              Under Construction{' '}
              <span role="img" aria-label="roadwork sign">
                🚧
              </span>
            </PageTitle>
          </div>
        )}
      </MainLayout>
    </>
  )
}
