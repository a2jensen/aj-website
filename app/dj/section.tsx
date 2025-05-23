const DJ = ( 
    {spotifyLinks} : { spotifyLinks : string[] }
 ) => {
    return (
        <div id="dj" className="bg-black text-white py-16">
            <div className="container mx-auto px-8">
                <h3 className="text-xl font-semibold pb-8">Radio DJ @ KSDT // Tuesdays 6pm</h3>
                        <ul className="flex flex-wrap border-l-2 border-white pl-4 py-2">
                            {spotifyLinks.map((id) => (
                                <li key={id} className="sm:w-1/2 md:w-1/2 lg:w-1/4 p-2">
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
            </div>
        </div>
    )
}

export default DJ;