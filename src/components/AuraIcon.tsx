const AuraIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer aura flame */}
    <path
      d="M12 2C12 2 6 8.5 6 13.5C6 17.5 8.5 21 12 22C15.5 21 18 17.5 18 13.5C18 8.5 12 2 12 2Z"
      fill="currentColor"
      opacity="0.2"
    />
    {/* Inner flame */}
    <path
      d="M12 6C12 6 8.5 10.5 8.5 14C8.5 16.5 10 18.5 12 19C14 18.5 15.5 16.5 15.5 14C15.5 10.5 12 6 12 6Z"
      fill="currentColor"
      opacity="0.45"
    />
    {/* Core */}
    <path
      d="M12 11C12 11 10.5 13 10.5 14.5C10.5 15.9 11.1 16.8 12 17C12.9 16.8 13.5 15.9 13.5 14.5C13.5 13 12 11 12 11Z"
      fill="currentColor"
      opacity="0.9"
    />
  </svg>
);

export default AuraIcon;
