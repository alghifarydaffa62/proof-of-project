import { useConnection, useConnections } from "wagmi"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import CreateEscrowForm from "../component/CreateEscrowForm"

export default function CreatePage() {
    const { address } = useConnection()
    const connections = useConnections()
    const navigate = useNavigate()

    useEffect(() => {
        if(connections.length == 0) {
            navigate('/')
        }
    }, [address, connections])
    
    return(
        <div className="p-6">
            <h1 className="text-2xl text-white font-semibold">Create page</h1>
            <CreateEscrowForm/>
        </div>
    )
}