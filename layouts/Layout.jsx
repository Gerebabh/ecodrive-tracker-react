import { Link, Outlet } from 'react-router'

function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F1F5F9]">
      <header className="bg-[#0F172A] text-[#F8FAFC]">
        <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="text-xl font-bold sm:text-2xl">
            EcoDrive Tracker
          </Link>
        </div>

        <nav
          aria-label="Navegacao principal"
          className="bg-[#1E293B]"
        >
          <ul className="mx-auto flex w-full max-w-7xl flex-wrap gap-4 px-4 py-3 text-sm sm:gap-6 sm:px-6 lg:px-8">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cadastro">Cadastro</Link>
            </li>
            <li>
              <Link to="/veiculos">Veiculos</Link>
            </li>
            <li>
              <Link to="/combustivel">Combustiveis</Link>
            </li>
            <li>
              <Link to="/comparador">Comparador</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <Outlet />
      </main>

      <footer className="bg-[#0F172A] px-4 py-4 text-center text-sm text-[#94A3B8]">
        &copy; 2026 EcoDrive Tracker
      </footer>
    </div>
  )
}

export default Layout
