type Props = { size?: number; className?: string }

/**
 * Brand mark: a wing made of three feathers (Icaro → Icarus).
 * Drawn with currentColor so it follows the theme.
 */
export function Logo({ size = 34, className }: Props) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      aria-hidden
      focusable="false"
    >
      <path data-feather="1" d="M9 31 30 8" />
      <path data-feather="2" d="M14 33 33 19" />
      <path data-feather="3" d="M20 34.5 32 30" />
    </svg>
  )
}
