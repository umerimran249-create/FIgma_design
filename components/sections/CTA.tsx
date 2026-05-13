import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";

export default function CTA() {
  return (
    <section id="contact" className="relative bg-[#2e3b5b]">
      <div className="pointer-events-none absolute -left-[150px] -top-[80px] h-[500px] w-[500px] rounded-full bg-[rgba(255,222,90,0.10)] blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-[50px] right-[-100px] h-[400px] w-[400px] rounded-full bg-[rgba(255,222,90,0.06)] blur-[80px]" />
      <div className="container-vl relative z-10 text-center">
        <SectionLabel text="READY TO LEAD THE DIGITAL EVOLUTION?" />
        <h2 className="mt-4 font-['Syne'] text-[32px] font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
          The time to act
          <br />
          is now.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-white/70">
          Let&apos;s build the future of your business together — with data, cloud, and design working in perfect harmony.
        </p>
        <Button href="/contact" size="lg" className="mt-8 w-full max-w-[320px]">
          Book a Free Consultation →
        </Button>
        <a href="/services" className="mt-5 block text-sm text-white/50 transition-colors hover:text-[#ffde5a]">
          or explore services first
        </a>
      </div>
    </section>
  );
}
