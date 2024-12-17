import Typewriter from "@/components/Typewriter"

const About = () => {
    return (
        <div className="bg-slate-400 min-h-40">
            <p className="text-5xl pl-8">
                 <Typewriter text="[Angelo Jensen]" delay={100}/>
            </p>
        </div>
    )
}

export default About;