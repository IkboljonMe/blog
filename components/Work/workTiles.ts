export type WorkTile = {
  title: string
  description: string
  image: {
    src: string
    width: number
    height: number
  }
}

export const workTiles: WorkTile[] = [
  {
    description: `Here are things`,
    title: `I've worked on`,
    image: {
      src: '/static/images/mix.png',
      width: 600,
      height: 770,
    },
  },
  {
    description: 'I built',
    title: 'Short URL',
    image: {
      src: '/static/images/shorturl.png',
      width: 600,
      height: 554,
    },
  },
  {
    description: `I built`,
    title: 'UzShop e-commerce',
    image: {
      src: '/static/images/uzshop.png',
      width: 600,
      height: 717,
    },
  },
  {
    description: `I built several`,
    title: 'Open Source APIs',
    image: {
      src: '/static/images/api.webp',
      width: 600,
      height: 717,
    },
  },
]
