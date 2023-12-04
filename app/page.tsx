import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { ScrollProvider } from '@/components/Providers/ScrollProvider'
import Hero from '@/components/Hero'
import Intro from '@/components/Intro'
export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return (
    <ScrollProvider>
      <Hero />
      <Intro />
    </ScrollProvider>
  )
}
