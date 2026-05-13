import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";

export default function CTA() {
  return (
    <section id="contact" className="relative bg-[#07070F]">
      <div className="pointer-events-none absolute -left-[150px] -top-[80px] h-[500px] w-[500px] rounded-full bg-[rgba(37,99,235,0.08)] blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-[50px] right-[-100px] h-[400px] w-[400px] rounded-full bg-[rgba(124,58,237,0.07)] blur-[80px]" />
      <div className="container-vl relative z-10 text-center">
        <SectionLabel text="READY TO LEAD THE DIGITAL EVOLUTION?" />
        <h2 className="mt-4 font-['Syne'] text-5xl font-bold text-white max-lg:text-[32px]">
          The time to act
          <br />
          is now.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-slate-400">
          Let&apos;s build the future of your business together — with data, cloud, and design working in perfect harmony.
        </p>
        <Button href="/contact" size="lg" className="mt-8 w-full max-w-[320px]">
          Book a Free Consultation →
        </Button>
        <a href="/services" className="mt-5 block text-sm text-[#4B5563] hover:text-slate-400">
          or explore services first
        </a>
      </div>
    </section>
  );
}
