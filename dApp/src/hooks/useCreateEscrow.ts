import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import MockUSDYABI from "../abi/MockUSYD.json"
import POPESCROWABI from "../abi/PoPEscrow.json"
import { useState } from "react";
import { parseUnits } from "viem";

const PoPEscrow_Address = import.meta.env.VITE_POPESCROW_ADDRESS
const USDY_ADDRESS = import.meta.env.VITE_USDY_ADDRESS

export function useCreateEscrow() {
    const [title, setTitle] = useState("")
    const [documentLink, setDocumentLink] = useState("")
    const [vendor, setVendor] = useState("")
    const [milestones, setMilestones] = useState<{name: string, amount: string}[]>([]);

    const {
        data: hashApprove,
        writeContract: writeApprove,
        isPending: isApprovePending
    } = useWriteContract()

    const { 
        data: hashCreate, 
        writeContract: writeCreate, 
        isPending: isCreatePending, 
        error: createError
    } = useWriteContract()

    const { isLoading: isApproveConfirming, isSuccess: isApproveSuccess } = 
        useWaitForTransactionReceipt({ hash: hashApprove });

    const { isLoading: isCreateConfirming, isSuccess: isCreateSuccess } = 
        useWaitForTransactionReceipt({ hash: hashCreate });

    const handleApprove = () => {
        try {
            const totalAmount = milestones.reduce((acc, curr) => {
                return acc + Number(curr.amount)
            }, 0)

            const amountInWei = parseUnits(totalAmount.toString(), 18)

            writeApprove({
                address: USDY_ADDRESS,
                abi: MockUSDYABI.abi,
                functionName: "approve",
                args: [PoPEscrow_Address, amountInWei]
            })
        } catch (error) {
            console.error("error approving: ", error)
        }
    }

    const handleCreate = async () => {
        try {
            const milestoneNames = milestones.map(m => m.name)
            const milestoneAmount = milestones.map(m => parseUnits(m.amount, 18))

            writeCreate({
                address: PoPEscrow_Address,
                abi: POPESCROWABI.abi,
                functionName: "createProject",
                args: [title, documentLink, vendor, milestoneNames, milestoneAmount]
            })
        } catch (error) {
            console.error("error creating escrow", error)
        }
    }

    const addMilestone = (name: string, amount: string) => {
        setMilestones([...milestones, {name, amount}])
    }

    return {
        title, setTitle,
        documentLink, setDocumentLink,
        vendor, setVendor,
        milestones, setMilestones, addMilestone,
        
        handleApprove,
        isApprovePending,
        isApproveConfirming,
        isApproveSuccess,
        
        handleCreate,
        isCreatePending,
        isCreateConfirming,
        isCreateSuccess,
        createError,
        hashCreate
    }

}

