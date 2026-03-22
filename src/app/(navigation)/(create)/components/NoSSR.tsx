import dynamic from "next/dynamic";
import React, { PropsWithChildren } from "react";

const NoSSR: React.FC<PropsWithChildren> = ({ children }) => <React.Fragment>{children}</React.Fragment>;

export default dynamic(() => Promise.resolve(NoSSR), {
  ssr: false,
});
