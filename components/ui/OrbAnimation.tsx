export default function OrbAnimation() {
  return (
    <div className="relative flex h-[320px] w-[320px] items-center justify-center">
      <div
        className="absolute h-[320px] w-[320px] rounded-full border border-[#2563EB1F]"
        style={{ animation: "spin 20s linear infinite" }}
      />
      <div
        className="absolute h-[240px] w-[240px] rounded-full border border-[#06B6D42F]"
        style={{ animation: "spin 15s linear infinite reverse" }}
      />
      <div className="absolute h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.15),rgba(6,182,212,0.05))]" />
      <div className="z-10 flex h-20 w-20 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2563EB,#06B6D4)] shadow-[0_0_40px_rgba(6,182,212,0.45)]">
        <span className="font-['Syne'] text-[28px] font-bold text-white">VL</span>
      </div>
      <span className="absolute left-8 top-9 h-1.5 w-1.5 rounded-full bg-cyan-400" style={{ animation: "pulse 2s infinite" }} />
      <span className="absolute right-10 top-14 h-1.5 w-1.5 rounded-full bg-blue-500" style={{ animation: "pulse 2s infinite 0.3s" }} />
      <span className="absolute bottom-8 left-14 h-1.5 w-1.5 rounded-full bg-violet-500" style={{ animation: "pulse 2s infinite 0.6s" }} />
      <span className="absolute bottom-12 right-10 h-1.5 w-1.5 rounded-full bg-cyan-300" style={{ animation: "pulse 2s infinite 0.9s" }} />
    </div>
  );
}
