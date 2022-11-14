import hotkeys, { KeyHandler } from "hotkeys-js";
import { useEffect } from "react";

const useHotkeys = (key: string, handler: KeyHandler) => {
  useEffect(() => {
    hotkeys(key, handler);

    return () => {
      hotkeys.unbind(key, handler);
    };
  }, [key, handler]);
};

export default useHotkeys;
