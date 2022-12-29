import { useEffect, useState } from "react";

export default function useIsSafari() {
  const [isSafari, setSafari] = useState(false);

  useEffect(() => {
    const isSafari =
      // @ts-ignore
      /constructor/i.test(window.HTMLElement) ||
      (function (p) {
        return p.toString() === "[object SafariRemoteNotification]";
      })(
        // @ts-ignore
        !window["safari"] ||
          // @ts-ignore
          (typeof safari !== "undefined" && window["safari"].pushNotification)
      );
    setSafari(isSafari);
  }, []);

  return isSafari;
}
