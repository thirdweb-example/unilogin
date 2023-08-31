/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { connectToSmartWallet } from "../lib/wallet";
import styles from "../styles/Home.module.css";
import { Blocks } from "react-loader-spinner";
import { Connected } from "./connected";
import { Footer } from "./footer";
import { Signer } from "ethers";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signer, setSigner] = useState<Signer | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("");
  const [error, setError] = useState("");

  const connectWallet = async () => {
    if (!username || !password) return;
    try {
      setIsLoading(true);
      const wallet = await connectToSmartWallet(username, password, (status) =>
        setLoadingStatus(status)
      );
      const s = await wallet.getSigner();
      setSigner(s);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.error(e);
      setError((e as any).message);
    }
  };

  return username && signer ? (
    <>
      <Connected signer={signer} username={username} />
    </>
  ) : isLoading ? (
    <div className={styles.filler}>
      <Blocks
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
      />
      <p className={styles.label} style={{ textAlign: "center" }}>
        {loadingStatus}
      </p>
    </div>
  ) : error ? (
    <div className={styles.filler}>
      <p className={styles.label} style={{ textAlign: "center" }}>
        ❌ {error}
      </p>
      <button className={styles.button} onClick={() => setError("")}>
        Try again
      </button>
    </div>
  ) : (
    <>
      <div className={styles.row_center} style={{ marginTop: "2rem" }}>
        <a href="https://thirdweb.com">
          <img src="thirdweb.svg" className={styles.logo} alt="logo" />
        </a>
        <h1 className={styles.title}>Unilogin</h1>
      </div>
      <div className={styles.filler}>
        <input
          type="text"
          placeholder="Username"
          className={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.button} onClick={() => connectWallet()}>
          Login
        </button>
      </div>
      <Footer />
    </>
  );
};
