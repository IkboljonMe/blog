import ListLayout from '@/layouts/MDX/ListLayout'
import MainLayout from '@/layouts/MainLayout'
import { sortedBlogPost } from '@/lib/utils/contentlayer'
import { POSTS_PER_PAGE } from '@/types/default'
import { getAllPosts } from '@/lib/notion'

export const metadata = {
  title: 'Blog - IkboljonMe',
  description: 'My Blogs - Ikboljon Abdurasulov',
}

export default async function Blog() {
  const posts = await getAllPosts()
  const sortedPosts = sortedBlogPost(posts)
  const initialDisplayPosts = sortedPosts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(sortedPosts.length / POSTS_PER_PAGE),
  }

  return (
    <MainLayout>
      <ListLayout
        posts={sortedPosts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="Blog"
      />
    </MainLayout>
  )
}

