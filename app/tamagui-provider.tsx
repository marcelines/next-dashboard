'use client'

import { Provider } from '@status-im/components'
import { useServerInsertedHTML } from 'next/navigation'

import config from '../tamagui.config'

import type React from 'react'

export function NextTamaguiProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useServerInsertedHTML(() => {
    // this first time this runs you'll get the full CSS including all themes
    // after that, it will only return CSS generated since the last call
    return (
      <style
        key="tamagui-css"
        dangerouslySetInnerHTML={{ __html: config.getNewCSS() }}
      />
    )
  })

  return <Provider>{children}</Provider>
}
