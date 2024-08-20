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
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-gray-12",
          cancelButton: "group-[.toast]:bg-gray-4 group-[.toast]:text-gray-11",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
