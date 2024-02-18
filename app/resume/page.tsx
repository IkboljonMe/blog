import MainLayout from '@/components/layouts/MainLayout'
import Sample from './Sample'

export const metadata = {
  title: 'Repos - IkboljonMe',
  description: 'My Repos - Ikboljon Abdurasulov',
}

export default function ResumePage() {
  return (
    <MainLayout>
      <Sample />
    </MainLayout>
  )
}
