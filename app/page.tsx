import { ScrollProvider } from '@/components/Providers/ScrollProvider'
import Hero from '@/components/Hero'
import Intro from '@/components/Intro'
import Works from '@/components/Work/Works'
import SectionContainer from '@/components/SectionContainer'
import RecentPosts from '@/components/RecentPosts'
import { Suspense } from 'react'
import TopTracks from '@/components/Spotify/TopTracks'
import { allCoreContent, sortedBlogPost } from '@/lib/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'

export default async function Page() {
  const sortedPosts = sortedBlogPost(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return (
    <ScrollProvider>
      <Hero />
      <Intro />
      <Works />
      <SectionContainer>
        <RecentPosts posts={posts} />
        <Suspense fallback="loading..">
          <TopTracks />
        </Suspense>
      </SectionContainer>
    </ScrollProvider>
  )
}
