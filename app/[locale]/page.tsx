import { ScrollProvider } from '@/components/Providers/ScrollProvider'
import Hero from '@/components/Hero'
import SectionContainer from '@/components/SectionContainer'
import RecentPosts from '@/components/RecentPosts'
import { Suspense } from 'react'
import TopTracks from '@/components/Spotify/TopTracks'
import { allCoreContent, sortedBlogPost } from '@/lib/utils/contentlayer'
import { getAllPosts } from '@/lib/notion'

export default async function Page() {
  const allBlogs = await getAllPosts()
  const sortedPosts = sortedBlogPost(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return (
    <ScrollProvider>
      <Hero />
      <SectionContainer>
        <RecentPosts posts={posts} />
        <Suspense fallback="loading..">
          <TopTracks />
        </Suspense>
      </SectionContainer>
    </ScrollProvider>
  )
}
