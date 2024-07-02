export function RootHeader({
  disableLoadingAnimation,
  loadingAnimationType,
}: {
  disableLoadingAnimation?: boolean;
  loadingAnimationType?: "animated" | "static";
}) {
  return (
    <header className="h-[56px] px-4 border-b border-[--border-100] flex items-center gap-2 shrink-0 relative">
      <div className="w-[24px] h-[24px] rounded-md flex items-center justify-center text-[--text] bg-[--text-100]">
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width={16} height={16}>
          <path
            d="M6.25 4.75L2.75 8M2.75 8L6.25 11.25M2.75 8H13.25"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="w-full leading-none bg-transparent border-none outline-none text-base text-[--text-400]">
        Search for apps and commands...
      </div>

      {!disableLoadingAnimation && (
        <div
          className="absolute top-full w-[200px] h-[1px] "
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0), var(--loader), rgba(255, 255, 255, 0))`,
            animation: loadingAnimationType === "animated" ? "nightRider 2s ease-in-out infinite" : undefined,
          }}
        />
      )}
    </header>
  );
}
