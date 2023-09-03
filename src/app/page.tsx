import Features from "@/components/Features";
import Offer from "@/components/Offer";
import Slider from "@/components/Slider";
import { Metadata } from "next/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Trattoria",
};

export default async function Home() {
  return (
    <main>
      <Slider />
      <Features />
      <Offer />
    </main>
  );
}
