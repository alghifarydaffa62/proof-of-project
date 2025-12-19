import Navbar from "../component/Navbar"
import { useConnections } from "wagmi"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function Home() {
    const connections = useConnections()
    const navigate = useNavigate()

    useEffect(() => {
        if(connections.length > 0) {
            navigate('/dashboard')
        }
    }, [connections, navigate])
    
    return(
        <div>
            <div className="my-5">
                <Navbar/>
            </div>

            <h1>WELCOME</h1>
        </div>
    )
}