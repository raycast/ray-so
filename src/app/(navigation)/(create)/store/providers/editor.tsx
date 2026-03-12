"use client";

import { createStore, Provider } from "jotai";

type Props = {
  children: React.ReactNode;
};

const store = createStore();

export default function EditorProvider({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}
