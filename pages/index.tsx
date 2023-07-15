import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import React from "react";
import { Login } from "../components/login";

const Home: NextPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Login />
      </div>
    </main>
  );
};

export default Home;
