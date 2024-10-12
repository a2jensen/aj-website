import Image from "next/image";
import Experience from "./experience/section";
import Projects from "./projects/section";
import About from "./about/section";

export default function Home() {
  return (
    <div>
      <About />
      <Experience />
      <Projects />
    </div>
  );
}
