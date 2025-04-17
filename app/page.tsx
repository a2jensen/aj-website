// app/page.tsx
import Experience from "./experience/section";
import Projects from "./projects/section";
import HeroSection from "@/components/HeroSection";
import About from "./about/section";

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <About/>
      <Experience />
      <Projects />
    </div>
  );
}

export default Home;