import { useTranslations } from 'next-intl' // Import the useTranslations hook
import { Tile } from '../Tiles/Tile'
import TileBackground from '../Tiles/TileBackground'
import { TileContent } from '../Tiles/TileContent'
import TileWrapper from '../Tiles/TileWrapper'
import { WorkBackground } from './WorkBackground'
import WorkContent from './WorkContent'
import { workTiles } from './workTiles'

export default function Works() {
  const t = useTranslations('Works') // Change 'Works' to your translation namespace

  // Map over workTiles and replace titles and descriptions with translated text
  const localizedWorkTiles = workTiles.map((work) => ({
    ...work,
    title: t(work.titleKey), // Get translated title
    description: t(work.descriptionKey), // Get translated description
  }))

  return (
    <TileWrapper numOfPages={localizedWorkTiles.length}>
      <TileBackground>
        <WorkBackground />
      </TileBackground>
      <TileContent>
        {localizedWorkTiles.map((work, i) => (
          <Tile page={i} key={work.titleKey}>
            <WorkContent work={work} />
          </Tile>
        ))}
      </TileContent>
    </TileWrapper>
  )
}
