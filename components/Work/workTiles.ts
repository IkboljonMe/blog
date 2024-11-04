export type WorkTile = {
  titleKey: string // Key for title translation
  descriptionKey: string // Key for description translation
  image: {
    src: string
    width: number
    height: number
  }
}

export const workTiles: WorkTile[] = [
  {
    descriptionKey: 'workTile1Description', // Key for translation
    titleKey: 'workTile1Title', // Key for translation
    image: {
      src: '/static/images/mix.png',
      width: 600,
      height: 770,
    },
  },
  {
    descriptionKey: 'workTile2Description',
    titleKey: 'workTile2Title',
    image: {
      src: '/static/images/shorturl.png',
      width: 600,
      height: 554,
    },
  },
  {
    descriptionKey: 'workTile3Description',
    titleKey: 'workTile3Title',
    image: {
      src: '/static/images/uzshop.png',
      width: 600,
      height: 717,
    },
  },
  {
    descriptionKey: 'workTile4Description',
    titleKey: 'workTile4Title',
    image: {
      src: '/static/images/api.webp',
      width: 600,
      height: 717,
    },
  },
]
