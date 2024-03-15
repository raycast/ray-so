import { WandIcon } from "@raycast/icons";
import { useState } from "react";
import classNames from "classnames";
import styles from "../styles/FormatButton.module.css";
import useHotkeys from "../util/useHotkeys";
import formatCode, { formatterSupportedLanguages } from "../util/formatCode";
import { useAtom } from "jotai";
import { codeAtom, selectedLanguageAtom } from "../store/code";

const FormatButton: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [language, setLanguage] = useAtom(selectedLanguageAtom);
  const [code, setCode] = useAtom(codeAtom);

  const format = () => {
    formatCode(code, language)
      .then((formatted) => {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 700);
        setCode(formatted);
        // Sometimes hljs thinks the formatted code is a different language
        // than the original, so we enforce the original language here
        setLanguage(language);
      })
      .catch((e) => {
        setIsAnimating(false);
        setHasError(true);
        setTimeout(() => setHasError(false), 500);
        return console.log("Formatting failed:", e);
      });
  };

  useHotkeys("alt+shift+f", (event) => {
    event.preventDefault();
    format();
  });

  // Hide button if language is not supported
  if (!language || !formatterSupportedLanguages.includes(language.name) || !code) {
    return null;
  }

  return (
    <button
      className={styles.button}
      onClick={format}
      title="Format code"
      aria-label="Format code"
      data-ignore-in-export
    >
      <WandIcon
        width={16}
        height={16}
        className={classNames(styles.icon, { [styles.isAnimating]: isAnimating, [styles.hasError]: hasError })}
      />
    </button>
  );
};

export default FormatButton;
