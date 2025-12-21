import { useActiveEscrows } from "../hooks/useActiveEscrows"
import ActiveEscrowBox from "../component/ActiveEscrowBox";
import { Briefcase } from "lucide-react";
export default function Archive() {
    const {projects, isLoading} = useActiveEscrows()
    const completedProjects = projects.filter((p: any) => p.isCompleted)

    if (isLoading) {
        return <div className="h-32 bg-slate-900 rounded-xl animate-pulse"></div>;
    }

    return(
        <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-4">
                <Briefcase className="text-emerald-400" /> Archieved Escrows
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {completedProjects.map((project: any) => (
                    <ActiveEscrowBox key={project.id} project={project}/>
                ))}
            </div>
        </div>
    )
}