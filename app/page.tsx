// app/page.tsx
import Experience from "./experience/section";
import Projects from "./projects/section";
import HeroSection from "@/components/HeroSection";
import About from "./about/section";
import DJ from "./dj/section";

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <About/>
      <DJ/>
      <Experience />
      <Projects />
    </div>
  );
}

export default Home;