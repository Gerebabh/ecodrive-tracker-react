function PageHeader({ eyebrow, title, description, className = '' }) {
  return (
    <header className={className}>
      <p className="mb-2 text-sm font-bold uppercase text-[#22C55E]">
        {eyebrow}
      </p>
      <h1 className="text-3xl font-bold text-[#0F172A]">{title}</h1>
      {description && (
        <p className="mt-3 max-w-3xl text-[#334155]">{description}</p>
      )}
    </header>
  )
}

export default PageHeader
