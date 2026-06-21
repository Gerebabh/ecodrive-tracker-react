import { Link, Outlet } from 'react-router'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F1F5F9]">
      <header className="bg-[#0F172A] text-[#F8FAFC]">
        <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="text-xl font-bold sm:text-2xl">
            EcoDrive Tracker
          </Link>
        </div>

        <Navbar />
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default Layout
