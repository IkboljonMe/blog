import Image from 'next/image';
import { WorkContainer } from './WorkContainer';
import { WorkLeft } from './WorkLeft';
import { WorkRight } from './WorkRight';
import { WorkTile } from './workTiles';
import { useTranslations } from 'next-intl';

interface WorkContentProps {
  work: WorkTile; // Ensure WorkTile is defined correctly
  progress?: number;
}

export default function WorkContent({ work, progress = 0 }: WorkContentProps) {
  const { titleKey, descriptionKey, image } = work;
  const t = useTranslations('Works'); // Fetch translations under the 'Works' namespace

  return (
    <WorkContainer>
      <WorkLeft progress={progress}>
        <div className="text-2xl font-medium md:text-3xl xl:text-4xl">
          {t(descriptionKey)} {/* Use translation key for description */}
        </div>
        <span className="text-4xl font-bold tracking-tight md:text-5xl xl:text-6xl">
          {t(titleKey)} {/* Use translation key for title */}
        </span>
      </WorkLeft>
      <WorkRight progress={progress}>
        <div className="drop-shadow-2xl sm:mt-10 md:mt-24">
          <Image src={image.src} alt={t(titleKey)} width={image.width} height={image.height} />
        </div>
      </WorkRight>
    </WorkContainer>
  );
}

