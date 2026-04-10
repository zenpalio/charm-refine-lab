const TOKEN_COLOR = "hsl(43 96% 58%)";

const TokenIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer coin ring */}
    <circle cx="12" cy="12" r="10" fill={TOKEN_COLOR} opacity="0.12" />
    <circle cx="12" cy="12" r="8.5" fill={TOKEN_COLOR} opacity="0.25" />
    {/* Inner coin face */}
    <circle cx="12" cy="12" r="7" fill={TOKEN_COLOR} opacity="0.4" />
    {/* Lightning bolt / token symbol */}
    <path
      d="M13.5 6L9.5 13H12L10.5 18L14.5 11H12L13.5 6Z"
      fill={TOKEN_COLOR}
      opacity="0.95"
    />
  </svg>
);

export default TokenIcon;
