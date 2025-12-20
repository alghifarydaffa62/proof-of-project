import { useConnection, useConnections } from "wagmi"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
export default function Dashboard() {
    const { address } = useConnection()
    const connections = useConnections()
    const navigate = useNavigate()

    useEffect(() => {
        if(connections.length == 0) {
            navigate('/')
        }
    }, [address, connections])
    
    
    return(
        <div>
            <h1 className="text-2xl font-semibold text-white">Dashboard</h1>

            <h1 className="text-white">Connected user: {address}</h1>
        </div>
    )
}