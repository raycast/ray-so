import { ToastProvider, ToastViewport } from "./components/Toast";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="select-none">
      <ToastProvider>
        {children} <ToastViewport />
      </ToastProvider>
    </div>
  );
}
