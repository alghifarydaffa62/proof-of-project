import { useConnection, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import POPEscrowABI from "../abi/PoPEscrow.json"
import { formatUnits } from "viem";

const POPESCROW_ADDRESS = import.meta.env.VITE_POPESCROW_ADDRESS

export function useEscrowDetails(projectId: number) {
    const { address } = useConnection()

    const { 
        data: projectData,
        isLoading: isLoadingData,
        refetch
    } = useReadContract({
        address: POPESCROW_ADDRESS,
        abi: POPEscrowABI.abi,
        functionName: "getProjectDetails",
        args: [BigInt(projectId)],
        query: { enabled: projectId >= 0 }
    })

    const { data: hash, writeContract, isPending: isApproving } = useWriteContract()
    const { isLoading: isConfirming, isSuccess: isApproved } = useWaitForTransactionReceipt({ hash })

    let formattedProject = null
    let userRole = ""

    if(projectData) {
        const p = projectData as any

        if(p.client.toLowerCase() === address?.toLowerCase()) {
            userRole = "Client"
        } else if (p.vendor.toLowerCase() === address?.toLowerCase()) {
            userRole = "Vendor"
        }

        formattedProject = {
            id: Number(projectId),
            name: p.name,
            client: p.client,
            vendor: p.vendor,
            totalAmount: formatUnits(p.totalAmount, 18),
            amountPaid: formatUnits(p.amountPaid, 18),
            isCompleted: p.isCompleted,
            currentMilestoneIndex: Number(p.currentMilestoneIndex),
            milestones: p.milestones,
            documentLink: p.documentLink
        }
    }

    const handleApproveMilestone = () => {
        if(userRole !== "Client") return alert("Hanya Client yang bisa approve!");

        writeContract({
            address: POPESCROW_ADDRESS,
            abi: POPEscrowABI.abi,
            functionName: "ApproveMileStone",
            args: [BigInt(projectId)]
        })
    }

    return {
        project: formattedProject,
        isLoading: isLoadingData,
        userRole,
        refetch,
        handleApproveMilestone,
        isApproving,
        isConfirming,
        isApproved
    }
}