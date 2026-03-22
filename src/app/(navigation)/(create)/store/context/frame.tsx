"use client";

import React, { createContext, PropsWithChildren, useRef } from "react";

export const FrameContext = createContext<React.MutableRefObject<Map<string, HTMLDivElement | null>>>({
  current: new Map(),
});

const FrameContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const frameRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());
  return <FrameContext.Provider value={frameRefs}>{children}</FrameContext.Provider>;
};

export default FrameContextProvider;
