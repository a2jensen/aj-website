const Experience = ( { experienceData } : { experienceData : string[]}) => {

    return (
        <div id="experience" className="bg-black text-white py-16">
            <div className="container mx-auto px-8">
                <h2 className="text-5xl font-bold mb-8">Experience</h2>
                <ul className="space-y-6 max-w-2xl">
                    {experienceData.map((experience) => (
                            <li key={experience} className="border-l-2 border-white pl-4 py-2">
                                <h3 className="text-xl font-semibold">{experience}</h3>
                            </li>   
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Experience;