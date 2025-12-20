import { useConnection, useConnections } from "wagmi"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useEscrowDetails } from "../hooks/useEscrowDetails"
import EscrowInfoBox from "../component/EscrowInfoBox"
import EscrowMilestoneBox from "../component/EscrowMilestoneBox"
import { Loader2, ArrowLeft } from "lucide-react";

export default function EscrowPage() {
    const { address } = useConnection()
    const connections = useConnections()
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        if(connections.length == 0) {
            navigate('/')
        }
    }, [address, connections])

    const {
        project, isLoading, userRole,
        handleApproveMilestone, isApproving, isConfirming
    } = useEscrowDetails(Number(id))

    if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-emerald-500"/></div>;
    if (!project) return <div className="text-center text-white py-20">Project not found.</div>;

    return(
        <div className="container mx-auto px-4 py-8">

            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors">
                <ArrowLeft size={18}/> Back to Dashboard
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-1">
                    <EscrowInfoBox info={{
                        id: project.id,
                        name: project.name,
                        client: project.client,
                        vendor: project.vendor,
                        totalAmount: project.totalAmount,
                        documentLink: project.documentLink
                    }} />
                </div>

                <div className="lg:col-span-2">
                    <EscrowMilestoneBox 
                        milestones={project.milestones}
                        currentStep={project.currentMilestoneIndex}
                        isCompleted={project.isCompleted}
                        userRole={userRole}
                        onApprove={handleApproveMilestone}
                        isProcessing={isApproving || isConfirming}
                    />
                </div>

            </div>
        </div>
    )
}