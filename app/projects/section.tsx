import Link from "next/link"

const Projects = () => {
    return (
        <div>
            <header className="text-5xl pl-8 pt-8">Projects</header>
            <ul className="mx-12 my-12"> 
                <li><Link href="https://triton-sea.com/"> TritonSEA </Link> </li>
                <li><Link href="https://www.kpucsd.com/"> KP </Link></li>
                <li><Link href="/"> ASPEN </Link></li>
            </ul>
        </div>
    )
}

export default Projects;