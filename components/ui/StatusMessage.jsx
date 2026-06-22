const styles = {
  error: 'bg-red-50 text-[#DC2626]',
  info: 'bg-[#F1F5F9] text-[#334155]',
  success: 'bg-green-50 text-[#16A34A]',
}

function StatusMessage({ children, type = 'info', className = '' }) {
  return (
    <p
      role={type === 'error' ? 'alert' : 'status'}
      className={`rounded-md px-4 py-3 font-medium ${styles[type]} ${className}`}
    >
      {children}
    </p>
  )
}

export default StatusMessage
