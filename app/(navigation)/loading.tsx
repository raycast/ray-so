export default function Loading() {
  return (
    <div
      className="fixed top-[49px] w-[600px] h-[1px] z-50 -left-[200px]"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255,255,255,0.3), rgba(255, 255, 255, 0))`,
        animation: "flash 2s ease-in-out infinite",
      }}
    />
  );
}
