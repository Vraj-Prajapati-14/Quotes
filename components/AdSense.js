'use client'

import { useRef } from 'react'
import Script from 'next/script'

export default function AdSense() {
  const adSenseId = process.env.NEXT_PUBLIC_ADSENSE_ID
  const scriptLoaded = useRef(false)

  if (!adSenseId) {
    return null
  }

  return (
    <Script
      id="adsbygoogle-init"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
      onLoad={() => {
        scriptLoaded.current = true
      }}
      onError={(e) => {
        console.error('AdSense script failed to load:', e)
      }}
    />
  )
}

