import Image from "next/image";
import Experience from "./experience/section";
import Projects from "./projects/section";
import About from "./about/section";
import Navbar from "@/components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <About />
      <Experience />
      <Projects />
    </div>
  );
}

export default Home;
