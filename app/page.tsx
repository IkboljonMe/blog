import { ScrollProvider } from '@/components/Providers/ScrollProvider'
import Hero from '@/components/Hero'
import Intro from '@/components/Intro'
import Works from '@/components/Work/Works'
export default async function Page() {
  return (
    <ScrollProvider>
      <Hero />
      <Intro />
      <Works />
    </ScrollProvider>
  )
}
