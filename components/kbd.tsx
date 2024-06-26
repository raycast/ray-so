export function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex h-6 items-center justify-center px-2 py-1 text-xxs font-medium bg-gray-a5 text-gray-a10 rounded-md tracking-[0.1px] font-sans w-auto">
      {children}
    </kbd>
  );
}

export function Shortcut({ children, keys }: { children: React.ReactNode; keys: string[] }) {
  return (
    <div className="flex justify-between items-center">
      <div className="text-gray-11 text-[13px]">{children}</div>
      <div className="flex items-end gap-1">
        {keys.map((key) => (
          <Kbd key={key}>{key}</Kbd>
        ))}
      </div>
    </div>
  );
}
