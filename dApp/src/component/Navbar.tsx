import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState, useEffect } from "react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav 
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b 
            ${isScrolled 
                ? "bg-[#0f172a]/70 backdrop-blur-md border-slate-700/50 py-4 shadow-lg" 
                : "bg-transparent border-transparent py-6"
            }`}
        >
            <div className="container mx-auto px-6 flex justify-around items-center">
                <h1 className="text-2xl font-bold text-white tracking-tight">
                    Proof of <span className="text-blue-400">Project</span>
                </h1>

                <ul className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
                    <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                    <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                    <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                </ul>

                <ConnectButton showBalance={false} accountStatus="address" />
            </div>
        </nav>
    );
}