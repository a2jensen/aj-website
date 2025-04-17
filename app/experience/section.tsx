const Experience = () => {
    return (
        <div id="experience" className="bg-black text-white py-16">
            <div className="container mx-auto px-8">
                <h2 className="text-5xl font-bold mb-8">Experience</h2>
                <ul className="space-y-6 max-w-2xl">
                    <li className="border-l-2 border-white pl-4 py-2">
                        <h3 className="text-xl font-semibold">Undergraduate Researcher @ UCSD</h3>
                    </li>
                    <li className="border-l-2 border-white pl-4 py-2">
                        <h3 className="text-xl font-semibold">Software Engineer Intern @ SDSC</h3>
                    </li>
                    <li className="border-l-2 border-white pl-4 py-2">
                        <h3 className="text-xl font-semibold">WebDev Lead @ KP</h3>
                    </li>
                    <li className="border-l-2 border-white pl-4 py-2">
                        <h3 className="text-xl font-semibold">Radio DJ @ KSDT</h3>
                        <ul className="flex flex-wrap">
                            {[ 
                                "4yfOwEFEH9Qmn0bbtffXGu",
                                "3XnBhHs1pE0czLTrmD0tDC",
                                "2absBchLXC2OHsIFHtSIht",
                                "36jmtwv9117ifHj4NMGB9P"
                            ].map((id) => (
                                <li key={id} className="w-full md:w-1/2 lg:w-2/4 p-2">
                                <iframe
                                    className=" mt-5"
                                    src={`https://open.spotify.com/embed/playlist/${id}?utm_source=generator`}
                                    width="100%"
                                    height="352"
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                />
                                </li>
                            ))}
                            </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Experience;