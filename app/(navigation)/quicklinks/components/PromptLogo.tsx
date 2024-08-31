import { StarsIcon, RaycastLogoNegIcon } from "@raycast/icons";
import styles from "./PromptLogo.module.css";

export function PromptLogo() {
  return (
    <span className={styles.logo}>
      <StarsIcon data-icon="stars" />
      <RaycastLogoNegIcon data-icon="raycast" />
    </span>
  );
}
