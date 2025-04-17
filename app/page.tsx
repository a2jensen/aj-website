import Experience from "./experience/section";
import Projects from "./projects/section";
import About from "./about/section";
import Navbar from "@/components/Navbar";

const Home = () => {
  return (
    <div className="bg-slate-400">
      <Navbar />
      <About />
      <Experience />
      <Projects />
    </div>
  );
}

export default Home;
