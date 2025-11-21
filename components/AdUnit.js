'use client'

import { useEffect, useRef } from 'react'

export default function AdUnit({ slot, format = 'auto', responsive = true }) {
  const adSenseId = process.env.NEXT_PUBLIC_ADSENSE_ID
  const adInitialized = useRef(false)
  const adElement = useRef(null)

  useEffect(() => {
    // Only initialize once
    if (adInitialized.current) {
      return
    }

    if (!adSenseId || !slot) {
      return
    }

    // Wait for AdSense script to load
    const initializeAd = () => {
      if (typeof window === 'undefined' || !window.adsbygoogle) {
        return
      }

      // Check if this specific ad slot has already been initialized
      if (adElement.current && adElement.current.hasAttribute('data-adsbygoogle-status')) {
        return
      }

      try {
        // Initialize only if not already initialized
        if (adElement.current && !adElement.current.hasAttribute('data-adsbygoogle-status')) {
          window.adsbygoogle.push({})
          adInitialized.current = true
        }
      } catch (err) {
        console.error('AdSense error:', err)
      }
    }

    // Try to initialize immediately if script is already loaded
    if (typeof window !== 'undefined' && window.adsbygoogle) {
      // Small delay to ensure DOM is ready
      setTimeout(initializeAd, 100)
    } else {
      // Wait for script to load
      const checkAdSense = setInterval(() => {
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          clearInterval(checkAdSense)
          setTimeout(initializeAd, 100)
        }
      }, 100)

      // Cleanup after 10 seconds
      setTimeout(() => clearInterval(checkAdSense), 10000)
    }

    // Cleanup function
    return () => {
      adInitialized.current = false
    }
  }, [adSenseId, slot])

  if (!adSenseId || !slot) {
    return null
  }

  return (
    <div className="my-8">
      <ins
        ref={adElement}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adSenseId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  )
}

