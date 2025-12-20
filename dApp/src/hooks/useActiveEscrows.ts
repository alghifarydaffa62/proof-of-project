import POPEscrowABI from "../abi/PoPEscrow.json"
import { useReadContract, useReadContracts, useConnection } from "wagmi"
import { formatUnits } from "viem"

const PoPEscrow_Address = import.meta.env.VITE_POPESCROW_ADDRESS

export function useActiveEscrows() {
    const { address: user } = useConnection()

    const { data: clientData } = useReadContract({
        address: PoPEscrow_Address,
        abi: POPEscrowABI.abi,
        functionName: "getMyClientProjects",
        args: [user],
        query: { enabled: !!user }
    })

    const { data: vendorData } = useReadContract({
        address: PoPEscrow_Address,
        abi: POPEscrowABI.abi,
        functionName: "getMyVendorProjects",
        args: [user],
        query: { enabled: !!user }
    })

    const clientProjectIds = (clientData as bigint[]) || [];
    const vendorProjectIds = (vendorData as bigint[]) || [];

    const allIds = [
        ...(clientProjectIds || []).map(id => Number(id)),
        ...(vendorProjectIds || []).map(id => Number(id))
    ]

    const uniqueIds = [...new Set(allIds)];

    const { data: projectsData, isLoading } = useReadContracts({
        contracts: uniqueIds.map((id) => ({
            address: PoPEscrow_Address,
            abi: POPEscrowABI.abi as any,
            functionName: "getProjectDetails",
            args: [id]
        })),
        query: { enabled: uniqueIds.length > 0 }
    })

    const formattedProjects = projectsData?.map((result, index) => {
        if (result.status !== "success") return null;
        
        const p = result.result as any; 
        const id = uniqueIds[index];

        const isClient = p.client.toLowerCase() === user?.toLowerCase();
        const role = isClient ? "Client" : "Vendor";

        return {
            id: id,
            name: p.name,
            role: role,
            client: p.client,
            vendor: p.vendor,
            totalAmount: formatUnits(p.totalAmount, 18), 
            amountPaid: formatUnits(p.amountPaid, 18),
            isCompleted: p.isCompleted,
            currentMilestoneIndex: Number(p.currentMilestoneIndex),
            milestones: p.milestones, 
            documentLink: p.documentLink
        };
    }).filter(p => p !== null) || []; 

    return {
        projects: formattedProjects,
        isLoading,
        isEmpty: formattedProjects.length === 0
    };
}