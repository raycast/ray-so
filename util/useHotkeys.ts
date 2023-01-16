import hotkeys, { KeyHandler } from "hotkeys-js";
import { useEffect } from "react";

hotkeys.filter = (event: KeyboardEvent) => {
  const target = (event.target || event.srcElement) as HTMLElement;

  const { tagName } = target;
  let flag = true;

  // ignore: isContentEditable === 'true', <input> and <textarea> when readOnly state is false, <select>
  if (
    target.isContentEditable ||
    target.getAttribute("role") === "option" ||
    ((tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT") &&
      "readOnly" in target &&
      !target.readOnly)
  ) {
    flag = false;
  }
  return flag;
};

const useHotkeys = (key: string, handler: KeyHandler) => {
  useEffect(() => {
    hotkeys(key, handler);

    return () => {
      hotkeys.unbind(key, handler);
    };
  }, [key, handler]);
};

export default useHotkeys;
