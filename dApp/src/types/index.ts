
export interface ProjectProps {
    id: number;
    name: string;
    role: string;
    client: string;
    vendor: string;
    totalAmount: string;
    isCompleted: boolean;
    currentMilestoneIndex: number;
    milestones: any[];
    documentLink: string;
}
export interface MilestoneItem {
    description: string;
    amount: bigint; 
}

export interface MilestoneProps {
    milestones: MilestoneItem[];
    currentStep: number;
    isCompleted: boolean;
    userRole: string; 
    onApprove: () => void;
    isProcessing: boolean;
}

export interface EscrowInfoProps {
    id: number;
    name: string;
    client: string;
    vendor: string;
    totalAmount: string;
    documentLink: string;
}