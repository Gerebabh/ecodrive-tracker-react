function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0F172A] px-4 py-4 text-center text-sm text-[#94A3B8]">
      <p>
        &copy; {currentYear} EcoDrive Tracker
      </p>
      <p className="mt-1">
        Projeto acadêmico - Construção de Frontend - IESB
      </p>
    </footer>
  )
}

export default Footer
