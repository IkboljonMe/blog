import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'
import { ScrollProvider } from '@/components/Providers/ScrollProvider'
import Hero from '@/components/Hero'

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return (
    <ScrollProvider>
      <Hero />
    </ScrollProvider>
  )
}
