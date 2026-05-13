import Image from "next/image";

export default function OrbAnimation() {
  return (
    <div className="relative mx-auto flex h-[260px] w-[260px] items-center justify-center sm:h-[320px] sm:w-[320px]">
      <div
        className="absolute h-full w-full rounded-full border border-[rgba(255,222,90,0.18)]"
        style={{ animation: "spin 20s linear infinite" }}
      />
      <div
        className="absolute h-[75%] w-[75%] rounded-full border border-[rgba(255,222,90,0.28)]"
        style={{ animation: "spin 15s linear infinite reverse" }}
      />
      <div className="absolute h-[55%] w-[55%] rounded-full border border-dashed border-[rgba(255,222,90,0.14)]" />
      <div className="absolute h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(255,222,90,0.18),rgba(255,182,72,0.04))]" />
      <div
        className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border border-[rgba(255,222,90,0.35)] shadow-[0_0_60px_rgba(255,222,90,0.5)]"
        style={{ background: "linear-gradient(135deg,#3a4a72,#2e3b5b)" }}
      >
        <Image
          src="/icon-mark.svg"
          alt="Vista Logica mark"
          width={50}
          height={50}
          className="h-[58%] w-[58%]"
        />
      </div>
      <span className="absolute left-8 top-9 h-1.5 w-1.5 rounded-full bg-[#ffde5a]" style={{ animation: "pulse 2s infinite" }} />
      <span className="absolute right-10 top-14 h-1.5 w-1.5 rounded-full bg-[#ffb648]" style={{ animation: "pulse 2s infinite 0.3s" }} />
      <span className="absolute bottom-8 left-14 h-1.5 w-1.5 rounded-full bg-[#ffe888]" style={{ animation: "pulse 2s infinite 0.6s" }} />
      <span className="absolute bottom-12 right-10 h-1.5 w-1.5 rounded-full bg-white" style={{ animation: "pulse 2s infinite 0.9s" }} />
    </div>
  );
}
