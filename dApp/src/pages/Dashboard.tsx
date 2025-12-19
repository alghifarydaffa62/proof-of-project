import { useConnection, useConnections } from "wagmi"
import { useNavigate } from "react-router-dom"
export default function Dashboard() {
    const { address } = useConnection()
    const connections = useConnections()
    const navigate = useNavigate()

    if(connections.length == 0) {
        navigate('/')
    }
    
    return(
        <div>
            <h1 className="text-2xl font-semibold text-white">Dashboard</h1>

            <h1 className="text-white">Connected user: {address}</h1>
        </div>
    )
}