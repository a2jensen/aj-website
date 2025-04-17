import Typewriter from "@/components/Typewriter"

const About = () => {
    return (
        <div id="about" className="bg-black text-white py-16">
            <div className="container mx-auto px-8">
                <div className="max-w-2xl">
                    <p className="text-xl mb-4">
                        <Typewriter text="Angelo Jensen" delay={100}/>
                    </p>
                    <p className="text-lg opacity-80">
                        CS @ UCSD <br/>
                        Passion for creating (0v0)
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About;