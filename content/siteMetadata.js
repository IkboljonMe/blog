const siteMetadata = {
  title: 'Ikboljon Abdurasulov',
  author: 'Ikboljon Abdurasulov',
  headerTitle: 'Ikboljon Me',
  description: 'Software Developer',
  language: 'en-us',
  theme: 'dark', // system, dark or light
  siteUrl: 'https://ikboljon.com',
  siteRepo: 'https://github.com/IkboljonMe/blog',
  siteLogo: '/static/images/logo.png',
  image: '/static/images/avatar.webp',
  socialBanner: '/static/images/twitter-card.png',
  email: 'ikboljonme@gmail.com',
  github: 'https://github.com/IkboljonMe',
  twitter: 'https://twitter.com/IkboljonMe',
  facebook: 'https://facebook.com/IkboljonMe',
  linkedin: 'https://www.linkedin.com/in/IkboljonMe/',
  spotify: 'https://open.spotify.com/user/31qkk742w6bkkj4r4a7b2gj4ewhe',
  locale: 'en-US',
  comment: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO || '',
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID || '',
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY || '',
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || '',
      mapping: 'pathname',
      reactions: '1',
      metadata: '0',
      theme: 'light',
      darkTheme: 'transparent_dark',
      themeURL: '',
    },
  },
}

module.exports = siteMetadata
