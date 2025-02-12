import Link from "next/link";

const Navbar = () => {
    return (
        <div className="sticky top-0 bg-slate-400 min-h-20"> 
            <ul className="flex pt-6 place-content-start font-bold lg:text-xl">
                <li className="mx-2 ml-8">about //</li>
                <li className="mx-2">experience //</li>
                <li className="mx-2">projects //</li>
                <Link href={"/wordle"} className="mx-2">minigames</Link>
            </ul>
        </div>
    )
}

export default Navbar;