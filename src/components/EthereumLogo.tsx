export const EthereumLogo = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 256 417"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      role="presentation"
    >
      <path
        fill="#FFFFFF"
        d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"
      />
      <path fill="#FFFFFF" d="M127.962 0L0 212.32l127.962 75.639V154.158z" />
      <path
        fill="#FFFFFF"
        d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.6L256 236.587z"
      />
      <path fill="#FFFFFF" d="M127.962 416.905v-104.72L0 236.585z" />
    </svg>
  );
};

export default EthereumLogo;
