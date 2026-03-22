"use client";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-gray-12 group-[.toaster]:border-gray-3 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-gray-11",
          actionButton: "group-[.toast]:bg-brand/15 group-[.toast]:text-brand",
          cancelButton: "group-[.toast]:bg-gray-a3 group-[.toast]:text-gray-a11",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
