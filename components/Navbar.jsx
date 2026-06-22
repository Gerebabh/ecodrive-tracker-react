import { NavLink } from 'react-router'

function Navbar() {
  const linkClass = ({ isActive }) =>
    isActive
      ? 'border-b-2 border-[#22C55E] py-2 text-[#22C55E]'
      : 'border-b-2 border-transparent py-2 text-[#E2E8F0] hover:text-[#22C55E]'

  return (
    <nav
      aria-label="Navegação principal"
      className="overflow-x-auto bg-[#1E293B] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <ul className="mx-auto flex w-max min-w-full max-w-7xl gap-5 px-4 py-2 text-sm sm:w-full sm:gap-6 sm:px-6 lg:px-8">
        <li>
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/cadastro" className={linkClass}>
            Cadastro
          </NavLink>
        </li>
        <li>
          <NavLink to="/veiculos" className={linkClass}>
            Veículos
          </NavLink>
        </li>
        <li>
          <NavLink to="/combustivel" className={linkClass}>
            Combustíveis
          </NavLink>
        </li>
        <li>
          <NavLink to="/comparador" className={linkClass}>
            Comparador
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
