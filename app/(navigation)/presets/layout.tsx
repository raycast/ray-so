import { ToastProvider, ToastViewport } from "./components/Toast";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      {children} <ToastViewport />
    </ToastProvider>
  );
}
