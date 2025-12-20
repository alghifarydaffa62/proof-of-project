
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