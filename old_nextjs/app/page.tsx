// app/page.tsx
import Experience from "./experience/section";
import Projects from "./projects/section";
import HeroSection from "@/components/HeroSection";
import About from "./about/section";
import DJ from "./dj/section";
import { dataFetch } from "./lib/data-fetch";

const Home = async () => {
  const data = await dataFetch()
  return (
    <div className="min-h-screen">
      <HeroSection />
      <About/>
      <Experience experienceData={data.expTitles}/>
      <Projects projectData={data.projectTitles}/>
      <DJ spotifyLinks={data.spotifyLinks}/>
    </div>
  );
}

export default Home;