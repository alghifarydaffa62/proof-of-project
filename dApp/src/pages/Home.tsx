import Navbar from "../component/Navbar"
import { useConnections } from "wagmi"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import Hero from "../component/Hero"
import About from "../component/About"
import Services from "../component/Services"
import Footer from "../component/Footer"

export default function Home() {
    const connections = useConnections()
    const navigate = useNavigate()

    useEffect(() => {
        if(connections.length > 0) {
            navigate('/dashboard')
        }
    }, [connections, navigate])
    
    return(
        <div className="bg-[#0f172a] min-h-screen text-slate-200 selection:bg-blue-500 selection:text-white font-sans">
            <Navbar/>
            <main>
                <Hero />
                <About />
                <Services />
            </main>
            <Footer />
        </div>
    )
}