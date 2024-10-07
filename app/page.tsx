import TypeWriteTitle from "@/components/TypeWriteTitle";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gradient-to-r min-h-screen from-rose-100 to-teal-100">
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <h1 className="font-semibold text-7xl text-center">
          AI <span className="text-green-600 font-bold">note taking</span>{" "}
          assistant
        </h1>
        <div className="mt-4"></div>
        <h2 className="font-semibold text-2xl text-center text-slate-700">
          <TypeWriteTitle></TypeWriteTitle>
        </h2>
        <div className="mt-4"></div>
        <Link href={"/dashboard"}>
          <Button className="bg-green-600">
            Get Started
            <ArrowRight className="ml-2 w-5 h-6" strokeWidth={3}></ArrowRight>
          </Button>
        </Link>
      </div>
    </div>
  );
}
