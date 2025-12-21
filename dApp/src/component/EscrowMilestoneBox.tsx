import { MilestoneProps } from "../types"
import { formatUnits } from "viem";
import { CheckCircle, Circle, Lock, ArrowRight } from "lucide-react";

export default function EscrowMilestoneBox({
    milestones, currentStep, isCompleted, userRole, onApprove, isProcessing 
}: MilestoneProps) {
    return(
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                Project Roadmap & Approval
            </h3>

            <div className="space-y-0 relative">
                <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-slate-800"></div>

                {milestones.map((ms: any, index: number) => {
                    const isPast = index < currentStep;
                    const isCurrent = index === currentStep && !isCompleted;
                    const amount = formatUnits(ms.amount, 18); 

                    return (
                        <div key={index} className={`relative pl-12 pb-8 ${index === milestones.length - 1 ? 'pb-0' : ''}`}>
                            <div className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center border-2 z-10 bg-slate-900
                                ${isPast || isCompleted ? 'border-green-500 text-green-500' : 
                                  isCurrent ? 'border-emerald-500 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 
                                  'border-slate-700 text-slate-700'}`}
                            >
                                {isPast || isCompleted ? <CheckCircle size={16}/> : 
                                 isCurrent ? <Circle size={16} fill="currentColor" className="animate-pulse"/> : 
                                 <Lock size={14}/>}
                            </div>

                            <div className={`p-4 rounded-lg border transition-all
                                ${isCurrent 
                                    ? 'bg-emerald-900/10 border-emerald-500/50' 
                                    : 'bg-slate-800/50 border-slate-800'}`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className={`font-semibold ${isCurrent ? 'text-white' : 'text-slate-400'}`}>
                                        {ms.description}
                                    </h4>
                                    <span className="font-mono text-emerald-400 font-bold">{amount} USDY</span>
                                </div>

                                <div className="mt-3 flex items-center justify-between">
                                    <span className={`text-xs px-2 py-1 rounded font-medium
                                        ${isPast || isCompleted ? 'bg-green-900/30 text-green-400' :
                                          isCurrent ? 'bg-yellow-900/30 text-yellow-400' :
                                          'bg-slate-700 text-slate-500'}`}
                                    >
                                        {isPast || isCompleted ? "PAID & COMPLETED" : 
                                         isCurrent ? "IN PROGRESS / WAITING APPROVAL" : 
                                         "LOCKED"}
                                    </span>

                                    {isCurrent && userRole === "Client" && (
                                        <button 
                                            onClick={onApprove}
                                            disabled={isProcessing}
                                            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-4 py-2 rounded font-bold transition-all shadow-lg shadow-emerald-900/20 disabled:bg-slate-600 disabled:cursor-not-allowed"
                                        >
                                            {isProcessing ? "Processing..." : <>Approve Release <ArrowRight size={14}/></>}
                                        </button>
                                    )}

                                    {isCurrent && userRole === "Vendor" && (
                                        <span className="text-xs text-slate-500 italic">Waiting for client approval...</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}