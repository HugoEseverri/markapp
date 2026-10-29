import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import LiveDemo from "@/components/landing/LiveDemo";
import Faq from "@/components/landing/Faq";
import CallToAction from "@/components/landing/CallToAction";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <LiveDemo />
      <Faq />
      <CallToAction />
    </>
  );
}
