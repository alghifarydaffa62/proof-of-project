import { useActiveEscrows } from "../hooks/useActiveEscrows"
import { Activity, CheckCircle, DollarSign, Briefcase } from "lucide-react";

export default function StatsBox() {
    const { projects, isLoading } = useActiveEscrows()
    const activeCount = projects?.filter((p: any) => !p.isCompleted).length || 0
    const completedCount = projects.filter((p: any) => p.isCompleted).length || 0

    if (isLoading) {
        return <div className="h-32 bg-slate-900 rounded-xl animate-pulse"></div>;
    }

    return(
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center justify-between">
                <div>
                    <p className="text-slate-400 text-sm mb-1 font-medium">Active Escrows</p>
                    <h2 className="text-3xl font-bold text-white">{activeCount}</h2>
                </div>
                <div className="bg-blue-900/20 p-3 rounded-lg border border-blue-900/30">
                    <Activity className="text-blue-400 w-8 h-8" />
                </div>
            </div>

            {/* --- KARTU 2: COMPLETED --- */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center justify-between">
                <div>
                    <p className="text-slate-400 text-sm mb-1 font-medium">Completed Projects</p>
                    <h2 className="text-3xl font-bold text-white">{completedCount}</h2>
                </div>
                <div className="bg-green-900/20 p-3 rounded-lg border border-green-900/30">
                    <CheckCircle className="text-green-400 w-8 h-8" />
                </div>
            </div>
        </div>
    )
}