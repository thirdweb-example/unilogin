function Footer() {
  return (
    <div className="flex flex-col items-center mb-8">
      <p className="text-gray-400">
        A ERC-4337 experiment built by{" "}
        <a
          href="https://twitter.com/joenrv"
          className="text-blue-500 hover:text-blue-400"
        >
          @joenrv
        </a>
      </p>
      <p className="text-gray-400 mt-1">
        <a
          href="https://github.com/thirdweb-example/ethlogin"
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 hover:text-blue-400"
        >
          Github Repo
        </a>{" "}
        ·{" "}
        <a
          href="https://thirdweb.com/joenrv.eth/CredentialAccountFactory"
          className="text-blue-500 hover:text-blue-400"
        >
          Contract sources
        </a>
      </p>
    </div>
  );
}

export default Footer;
