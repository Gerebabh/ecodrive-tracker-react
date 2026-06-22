import { Link } from 'react-router'

const baseClass =
  'inline-flex min-h-12 items-center justify-center rounded-md px-5 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50'

const variants = {
  primary: 'bg-[#22C55E] text-[#0F172A] hover:bg-[#16A34A]',
  secondary:
    'border border-slate-300 text-[#334155] hover:bg-[#F1F5F9]',
  danger: 'bg-[#DC2626] text-white hover:bg-red-700',
}

function buttonClass(variant, className) {
  return `${baseClass} ${variants[variant]} ${className}`.trim()
}

function Button({
  children,
  className = '',
  variant = 'primary',
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={buttonClass(variant, className)}
      {...props}
    >
      {children}
    </button>
  )
}

function ButtonLink({
  children,
  className = '',
  variant = 'primary',
  ...props
}) {
  return (
    <Link className={buttonClass(variant, className)} {...props}>
      {children}
    </Link>
  )
}

export { Button, ButtonLink }
