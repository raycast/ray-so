"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { NavigationActions } from "@/components/navigation";
import Frame from "@code/components/Frame";
import NoSSR from "@code/components/NoSSR";
import Controls from "@code/components/Controls";
import styles from "@code/code.module.css";
import FrameContextStore from "@code/store/FrameContextStore";
import { highlighterAtom } from "@code/store";
import { getCodeHighlighter } from "@code/util/highlighter";

type CodeWorkspaceProps = {
  actions: React.ReactNode;
  controls?: React.ReactNode;
};

export function CodeWorkspace({ actions, controls }: CodeWorkspaceProps) {
  const [highlighter, setHighlighter] = useAtom(highlighterAtom);

  useEffect(() => {
    let cancelled = false;
    getCodeHighlighter().then(
      (loadedHighlighter) => {
        if (!cancelled) setHighlighter(loadedHighlighter);
      },
      (error) => console.error("Could not load the code highlighter", error),
    );
    return () => {
      cancelled = true;
    };
  }, [setHighlighter]);

  return (
    <FrameContextStore>
      <NavigationActions>{actions}</NavigationActions>
      <div className={styles.app}>
        <NoSSR>
          {highlighter && <Frame />}
          {controls ?? <Controls />}
        </NoSSR>
      </div>
    </FrameContextStore>
  );
}
