/**
 * Sparkle.tsx — 4-point star glyph used as nav separator and favicon.
 * SVG path from §6.9 on a 24×24 viewBox.
 */
export function Sparkle({
  size = 12,
  fill = "#C9C9C9",
  className = "",
  ...props
}: {
  size?: number;
  fill?: string;
  className?: string;
} & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M12 0C12.6 6.6 17.4 11.4 24 12C17.4 12.6 12.6 17.4 12 24C11.4 17.4 6.6 12.6 0 12C6.6 11.4 11.4 6.6 12 0Z" />
    </svg>
  );
}
