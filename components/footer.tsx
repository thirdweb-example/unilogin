import styles from "../styles/Home.module.css";

export const Footer = () => {
  return (
    <div className={styles.column_center} style={{ marginBottom: "2rem" }}>
      <p className={styles.label} style={{ color: "#999" }}>
        A ERC-4337 experiment built by{" "}
        <a href="https://twitter.com/joenrv">@joenrv</a>
      </p>
      <p className={styles.label} style={{ color: "#999", marginTop: "5px" }}>
        <a href="https://github.com/thirdweb-example/unilogin" target="_blank">
          Github Repo
        </a>{" "}
        ·{" "}
        <a href="https://thirdweb.com/joenrv.eth/CredentialAccountFactory">
          Contract sources
        </a>
      </p>
    </div>
  );
};
