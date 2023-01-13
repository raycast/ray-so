import React, { createContext, PropsWithChildren, RefObject, useRef } from "react";

export const FrameContext = createContext<RefObject<HTMLDivElement> | null>(null);

const FrameContextStore: React.FC<PropsWithChildren> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);

  return <FrameContext.Provider value={ref}>{children}</FrameContext.Provider>;
};

export default FrameContextStore;
