const iconPaths = {
  consumption:
    'M4 19h16M6 16l2-4 3 2 3-6 4 3M6 5h12a2 2 0 0 1 2 2v10H4V7a2 2 0 0 1 2-2Z',
  energy:
    'M13 2 5 14h6l-1 8 9-13h-6V2Z',
  price:
    'M12 2v20M17 6.5c0-1.4-2.2-2.5-5-2.5S7 5.1 7 6.5 9.2 9 12 9s5 1.1 5 3.5S14.8 15 12 15s-5-1.1-5-2.5',
  vehicle:
    'M5 17h14M6 17l-1-5 2-5h10l2 5-1 5M7 12h10M8 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z',
}

function DashboardStat({ value, label, icon, highlight = false }) {
  return (
    <article className="flex min-h-32 items-start gap-4 border border-slate-200 bg-[#F8FAFC] p-5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-green-100 text-[#16A34A]">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-6 w-6 fill-none stroke-current"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={iconPaths[icon]} />
        </svg>
      </span>
      <div className="min-w-0">
        <p
          className={`text-2xl font-bold ${
            highlight ? 'text-[#16A34A]' : 'text-[#0F172A]'
          }`}
        >
          {value}
        </p>
        <p className="mt-1 text-sm text-[#334155]">{label}</p>
      </div>
    </article>
  )
}

export default DashboardStat
