export function Button({ children, className, ...props}) {
  return (
    <button className={`z-20 select-none [&:before]:bg-gradient-to-b [&:before]:from-blue-500 [&:before]:to-blue-800 relative btn-58 font-bold pointer-events-auto w-1/2 max-w-[360px] ${className || ''}`} {...props}>
      {children}
    </button>
  )
}
