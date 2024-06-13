import { RaycastLogoNegIcon } from "@raycast/icons";
import { SnippetsIcon } from "./Icons";

import styles from "./SnippetLogo.module.css";

export function SnippetLogo() {
  return (
    <span className={styles.logo}>
      <SnippetsIcon />
      <RaycastLogoNegIcon data-icon="raycast" />
    </span>
  );
}
