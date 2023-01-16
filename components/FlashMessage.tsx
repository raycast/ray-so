import React, { useRef } from "react";
import { useAtom } from "jotai";
import { CSSTransition } from "react-transition-group";
import { derivedFlashMessageAtom } from "../store/flash";

import styles from "styles/FlashMessage.module.css";

const FlashMessage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [flashMessage] = useAtom(derivedFlashMessageAtom);

  return (
    <CSSTransition in={!!flashMessage} nodeRef={containerRef} timeout={300} classNames={styles} unmountOnExit>
      <div className={styles.container} ref={containerRef}>
        <span className={styles.flash}>
          {flashMessage?.icon}
          {flashMessage?.message}
        </span>
      </div>
    </CSSTransition>
  );
};

export default FlashMessage;
