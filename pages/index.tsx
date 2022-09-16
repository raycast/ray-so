import type { NextPage } from "next";
import dynamic from "next/dynamic";
import styles from "../styles/Home.module.css";

const DynamicEditor = dynamic(() => import("../components/Editor"), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <>
      <DynamicEditor />
    </>
  );
};

export default Home;
