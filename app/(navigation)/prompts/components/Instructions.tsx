import { Button } from "@/components/button";
import styles from "./Instructions.module.css";

export function Instructions() {
  return (
    <div className={styles.root}>
      <div className={styles.skeletons}>
        <Skeleton />
        <Skeleton selected />
        <Skeleton />
        <Skeleton />
        <Cursor />
      </div>

      <h3 className={styles.title}>Install AI Commands</h3>
      <p className={styles.description}>
        Select a prompt by clicking on it. Hold <kbd data-variant="small">⌘</kbd> to select multiple. Click{" "}
        <strong>Add to Raycast</strong> to import them directly.
      </p>

      <Button variant="primary" disabled>
        Add to Raycast
      </Button>
    </div>
  );
}

function Skeleton({ selected = false }) {
  return (
    <div className={styles.skeleton} data-selected={selected}>
      <div className={styles.skeletonPrimary} />
      <div className={styles.skeletonSecondary} />
    </div>
  );
}

const Cursor = () => (
  <svg
    className={styles.skeletonCursor}
    width="12"
    height="18"
    viewBox="0 0 12 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="12" height="18" fill="white" fillOpacity="0.01" />
    <path
      d="M9.51124 11.5H4.94536C4.66188 11.5 4.39171 11.6203 4.20207 11.831L1.74329 14.563C1.1302 15.2442 0 14.8105 0 13.894V2.3434C0 1.46271 1.05606 1.01206 1.69191 1.62141L10.2031 9.77801C10.8538 10.4016 10.4124 11.5 9.51124 11.5Z"
      fill="#888888"
    />
    <path
      d="M7.64353 10.3273L4.26005 10.0234C4.09699 10.0088 3.93708 10.0749 3.83198 10.2004L1.87261 12.5404C1.57276 12.8985 0.989258 12.6865 0.989258 12.2194V3.61637C0.989258 3.17065 1.52839 2.94769 1.84321 3.26321L8.0422 9.47611C8.37211 9.80676 8.10875 10.369 7.64353 10.3273Z"
      fill="#363636"
    />
  </svg>
);
