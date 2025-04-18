import Link from "next/link"

const Projects = () => {
    return (
        <div id="project" className="bg-black text-white py-16">
            <div className="container mx-auto px-8">
                <h2 className="text-5xl font-bold mb-8">Projects</h2>
                <ul className="space-y-6 max-w-2xl">
                    <li className="border-l-2 border-black pl-4 py-2">
                        <h3 className="text-xl font-semibold">TritonSEA</h3>
                        <Link href="https://triton-sea.com/" className="inline-block mt-2 text-sm underline">
                            View Project →
                        </Link>
                    </li>
                    <li className="border-l-2 border-black pl-4 py-2">
                        <h3 className="text-xl font-semibold">KP</h3>
                        <Link href="https://www.kpucsd.com/" className="inline-block mt-2 text-sm underline">
                            View Project →
                        </Link>
                    </li>
                    <li className="border-l-2 border-black pl-4 py-2">
                        <h3 className="text-xl font-semibold">ASPEN</h3>
                        <p className="opacity-80 mt-1">in development</p>
                        <Link href="/" className="inline-block mt-2 text-sm underline">
                            View Project →
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Projects;