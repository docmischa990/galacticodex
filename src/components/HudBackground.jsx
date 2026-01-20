export default function HudBackground() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {/* Glass layer */}
      <div className="absolute inset-0 backdrop-blur-[10px] bg-white/[0.1] opacity-[0.20] rounded-4xl" />

      {/* HUD SVG */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.30]"
        viewBox="0 0 100 200"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle cx="50" cy="140" r="40" fill="none" stroke="white" strokeWidth="0.25" />
        <circle cx="50" cy="140" r="28" fill="none" stroke="white" strokeWidth="0.18" />
        <line x1="50" y1="140" x2="50" y2="20" stroke="white" strokeWidth="0.18" />
      </svg>

      {/* Specular edge */}
      <div className="absolute inset-x-0 top-65 h-px bg-white/10" />
    </div>
  );
}
