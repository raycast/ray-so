import styles from "./NewTag.module.css";

export default function NewTag() {
  return (
    <>
      <div className={styles.pulsation}></div>
      <div className={styles.tooltip}>
        <span className={styles.newTag}>New</span>
        Upload your own SVGs from your desktop
      </div>
    </>
  );
}
