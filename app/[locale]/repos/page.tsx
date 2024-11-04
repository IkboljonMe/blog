import Repos from '@/components/Repos/Repos'
import MainLayout from '@/layouts/MainLayout'
import { useTranslations } from 'next-intl'
export const metadata = {
  title: 'Repos - IkboljonMe',
  description: 'My Repos - Ikboljon Abdurasulov',
}

export default function RepoPage() {
  const t = useTranslations('RepoPage')
  return (
    <MainLayout>
      <div className="space-y-2 pb-8 pt-6 md:space-y-5 ">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
          {t('popular-repos')}
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">{t('selected-repos')}</p>
      </div>
      <Repos />
    </MainLayout>
  )
}
