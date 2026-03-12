import { useEffect, useState } from "react";

export default function usePngClipboardSupported() {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(window.navigator && window.navigator.clipboard && typeof ClipboardItem === "function");
  }, []);

  return supported;
}
