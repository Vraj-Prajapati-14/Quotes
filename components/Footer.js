import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Quotes & Shayari</h3>
            <p className="text-gray-400">
              Your daily source of inspiration with quotes, shayari, and status messages.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/category/love-quotes" className="hover:text-white transition-colors" title="Love Quotes Collection">
                  Love Quotes
                </Link>
              </li>
              <li>
                <Link href="/category/attitude-status" className="hover:text-white transition-colors" title="Attitude Status Collection">
                  Attitude Status
                </Link>
              </li>
              <li>
                <Link href="/category/shayari" className="hover:text-white transition-colors" title="Shayari Collection">
                  Shayari
                </Link>
              </li>
              <li>
                <Link href="/category/motivation-quotes" className="hover:text-white transition-colors" title="Motivation Quotes Collection">
                  Motivation Quotes
                </Link>
              </li>
              <li>
                <Link href="/category/festival-wishes" className="hover:text-white transition-colors" title="Festival Wishes Collection">
                  Festival Wishes
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-white transition-colors">
                  Search
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <p className="text-gray-400 text-sm">
              We provide daily updated quotes, shayari, and status messages to inspire and entertain you.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Quotes & Shayari. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

