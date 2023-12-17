'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import useBreakpoint from 'use-breakpoint'
import RepoPreview from './RepoPreview'
import { repos } from './constants'
import { RepoModal } from './types'
import RepoItem from './RepoItem'

const BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1280 }

export default function Repos() {
  const { breakpoint } = useBreakpoint(BREAKPOINTS)
  const [modal, setModal] = useState<RepoModal>({ active: false, index: 0 })

  return (
    <>
      {repos.map((repo, index) => (
        <motion.div
          key={repo.title}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: index / 10 }}
        >
          <RepoItem
            index={index}
            title={repo.title}
            url={repo.url}
            role={repo.role}
            setModal={setModal}
          />
        </motion.div>
      ))}
      {breakpoint === 'desktop' && <RepoPreview modal={modal} repos={repos} />}
    </>
  )
}
