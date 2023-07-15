import styles from "../styles/Home.module.css";

export const Footer = () => {
  return (
    <div className={styles.column_center} style={{ marginBottom: "2rem" }}>
      <p className={styles.label} style={{ color: "#999" }}>
        A thirdweb ERC-4337 experiment
      </p>
      <p className={styles.label} style={{ color: "#999", marginTop: "5px" }}>
        built by <a href="https://twitter.com/joenrv">@joenrv</a>
      </p>
    </div>
  );
};
