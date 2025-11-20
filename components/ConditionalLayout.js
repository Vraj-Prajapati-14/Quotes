'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'

export default function ConditionalLayout({ children }) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  return (
    <>
      {!isLoginPage && <Header />}
      <main className="min-h-screen" itemScope itemType="https://schema.org/WebPage">
        {children}
      </main>
      {!isLoginPage && <Footer />}
    </>
  )
}

