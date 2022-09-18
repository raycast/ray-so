import type { NextPage } from "next";
import Frame from "../components/Frame";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [theme, setTheme] = useState<string>("dark");

  useEffect(() => {
    const defaultDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(defaultDark ? "dark" : "light");
  }, []);

  return (
    <div className={styles.app} data-theme={theme}>
      <Frame />
    </div>
  );
};

export default Home;
