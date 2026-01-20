import Link from "next/link"

interface proj {
    name : string,
    link : string
}

const Projects = ( {projectData} : {projectData : proj[] }) => {
    return (
        <div id="project" className="bg-black text-white py-16">
            <div className="container mx-auto px-8">
                <h2 className="text-5xl font-bold mb-8">Projects</h2>
                <ul className="space-y-6 max-w-2xl">
                    {
                        projectData.map((projectTitle) => {
                            return (
                                <li key={projectTitle.name} className="border-l-2 border-black pl-4 py-2">
                                    <h3 className="text-xl font-semibold">{projectTitle.name}</h3>
                                    <Link href={projectTitle.link} className="inline-block mt-2 text-sm underline">
                                        View Project →
                                    </Link>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Projects;