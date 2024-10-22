import Typewriter from "@/components/Typewriter"

export default function About() {
    return (
        <div className="justify-start min-h-screen bg-slate-400">
            <p className="pt-48 pl-8 text-9xl">
                Hello, im <Typewriter text="Angelo" delay={100}/>
            </p>
        </div>
    )
}