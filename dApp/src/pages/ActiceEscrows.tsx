import { useActiveEscrows } from "../hooks/useActiveEscrows";
import ActiveEscrowBox from "../component/ActiveEscrowBox";
import { Loader2, Briefcase } from "lucide-react";

export default function ActiveEscrows() {
    const { projects, isLoading, isEmpty } = useActiveEscrows()

    if(isLoading) {
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-emerald-500"/></div>
    }

    if(isEmpty) {
        <div className="text-center py-10 border border-dashed border-slate-700 rounded-xl">
            <p className="text-slate-500">Belum ada proyek aktif.</p>
        </div>
    }

    return(
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Briefcase className="text-emerald-400" /> Active Escrows
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project: any) => (
                    <ActiveEscrowBox key={project.id} project={project} />
                ))}
            </div>
        </div>
    )
}