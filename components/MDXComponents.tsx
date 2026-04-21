/* eslint-disable react/display-name */
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import LinkButton from './LinkButton'
import Pre from './Pre'
import TOCInline from './TOCInline'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  LinkButton,
}
