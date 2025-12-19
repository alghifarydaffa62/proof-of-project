import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function Navbar() {
    return(
        <nav className="flex justify-evenly items-center">
            <h1 className="text-2xl font-semibold">Proof of Project</h1>

            <ul className="flex justify-center gap-5 text-xl">
                <li>
                    <a href="">Home</a>
                </li>
                <li>
                    <a href="">About</a>
                </li>
                <li>
                    <a href="">Services</a>
                </li>
            </ul>

            <ConnectButton/>
        </nav>
    )
}