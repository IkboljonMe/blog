import Repos from '@/components/Repos/Repos'
import MainLayout from '@/layouts/MainLayout'

export const metadata = {
  title: 'Repos - IkboljonMe',
  description: 'My Repos - Ikboljon Abdurasulov',
}

export default function Page() {
  return (
    <MainLayout>
      <div className="space-y-2 pb-8 pt-6 md:space-y-5 ">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
          My Popular Repos
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Here are some of my selected repos worth sharing.
        </p>
      </div>
      <Repos />
    </MainLayout>
  )
}
