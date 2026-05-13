import { Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#03030A] py-12">
      <div className="container-vl grid gap-10 lg:grid-cols-3">
        <div>
          <p className="font-['Syne'] text-2xl font-bold">
            <span className="text-white">Vista</span>
            <span className="text-cyan-400">Logica</span>
            <span className="ml-1 inline-block h-2 w-2 rounded-full bg-cyan-400" />
          </p>
          <p className="mt-3 max-w-sm text-sm text-[#4B5563]">
            Optimising business outcomes through technology and digital enablement.
          </p>
        </div>
        <div className="space-y-2 text-sm text-slate-400">
          <a href="#">Home</a><br />
          <a href="#services">Services</a><br />
          <a href="#vistaflair">VistaFlair</a><br />
          <a href="#">Privacy Policy</a>
        </div>
        <div className="space-y-3">
          <p className="text-sm text-slate-400">Melbourne, Australia</p>
          <a href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white">
            <Linkedin size={16} />
          </a>
        </div>
      </div>
      <div className="container-vl mt-8 text-xs text-[#4B5563]">
        © Vista Logica Pty Ltd. 2026. All rights reserved.
      </div>
    </footer>
  );
}
