import { useEffect, useState } from "react";

export default function usePngClipboardSupported() {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(window.navigator && window.navigator.clipboard && typeof ClipboardItem === "function"); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  return supported;
}
