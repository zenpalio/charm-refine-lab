const AuraIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Inner core */}
    <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.9" />
    {/* Middle ring */}
    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    {/* Outer ring */}
    <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1" opacity="0.25" strokeDasharray="3 2" />
    {/* Energy rays */}
    <path d="M12 1.5V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <path d="M12 20V22.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <path d="M1.5 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <path d="M20 12H22.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
  </svg>
);

export default AuraIcon;
