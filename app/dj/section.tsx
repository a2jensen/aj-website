const DJ = () => {
    return (
            <div id="dj" className="container mx-auto px-8">
                    <li className="border-l-2 border-white pl-4 py-2">
                        <h3 className="text-xl font-semibold">Radio DJ @ KSDT // Tuesdays 6pm</h3>
                        <ul className="flex flex-wrap">
                            {[ 
                                "4yfOwEFEH9Qmn0bbtffXGu",
                                "3XnBhHs1pE0czLTrmD0tDC",
                                "2absBchLXC2OHsIFHtSIht",
                                "36jmtwv9117ifHj4NMGB9P"
                            ].map((id) => (
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
                    </li>
            </div>
    )
}

export default DJ;