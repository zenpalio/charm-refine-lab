const AuraIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer glow shape */}
    <path
      d="M12 1.5C12 1.5 5 9 5 14.5C5 18.6 8.1 22 12 22C15.9 22 19 18.6 19 14.5C19 9 12 1.5 12 1.5Z"
      fill="currentColor"
      opacity="0.15"
    />
    {/* Mid flame — dynamic sweep */}
    <path
      d="M12 5C12 5 7.5 11 7.5 14.8C7.5 17.6 9.5 19.5 12 19.5C14.5 19.5 16.5 17.6 16.5 14.8C16.5 11 12 5 12 5Z"
      fill="currentColor"
      opacity="0.35"
    />
    {/* Inner core — bright hot center */}
    <path
      d="M12 9.5C10.5 12 9.5 13.5 9.5 15C9.5 16.4 10.6 17.5 12 17.5C13.4 17.5 14.5 16.4 14.5 15C14.5 13.5 13.5 12 12 9.5Z"
      fill="currentColor"
      opacity="0.7"
    />
    {/* Hottest core spark */}
    <path
      d="M12 12.5C11.3 13.5 10.8 14.3 10.8 15C10.8 15.7 11.3 16.2 12 16.2C12.7 16.2 13.2 15.7 13.2 15C13.2 14.3 12.7 13.5 12 12.5Z"
      fill="currentColor"
      opacity="1"
    />
  </svg>
);

export default AuraIcon;
