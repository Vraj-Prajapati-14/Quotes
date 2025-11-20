'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export default function AdSense() {
  const adSenseId = process.env.NEXT_PUBLIC_ADSENSE_ID

  useEffect(() => {
    if (adSenseId && typeof window !== 'undefined') {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (err) {
        console.error('AdSense error:', err)
      }
    }
  }, [])

  if (!adSenseId) {
    return null
  }

  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseId}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    </>
  )
}

