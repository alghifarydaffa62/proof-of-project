import { ExternalLink, CheckCircle, Clock, Shield, User } from "lucide-react";
import { ProjectProps } from "../types";
import { Link } from "react-router-dom";

export default function ActiveEscrowBox({ project }: { project: ProjectProps }) {
    const progressPercent = project.isCompleted 
        ? 100 
        : (project.currentMilestoneIndex / project.milestones.length) * 100;

    return(
        <div className={`relative bg-slate-900 border rounded-xl p-6 w-md transition-all hover:shadow-lg hover:shadow-emerald-900/20 group flex flex-col justify-between h-full
            ${project.isCompleted ? 'border-green-900/50 opacity-75' : 'border-slate-700 hover:border-emerald-500/50'}`}
        >
            <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-mono text-slate-500 bg-slate-800 px-2 py-1 rounded">
                    ID: #{project.id}
                </span>

                <span className={`text-xs font-bold px-3 py-1 rounded-full border flex items-center gap-1 ${
                    project.role === 'Client' 
                    ? 'bg-blue-900/30 text-blue-400 border-blue-800' 
                    : 'bg-purple-900/30 text-purple-400 border-purple-800'
                }`}>
                    {project.role === 'Client' ? <User size={12}/> : <Shield size={12}/>}
                    {project.role}
                </span>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-bold text-white truncate group-hover:text-emerald-400 transition-colors" title={project.name}>
                    {project.name}
                </h3>
                <a 
                    href={project.documentLink} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-emerald-400 mt-1 transition-colors"
                >
                    View Contract PDF <ExternalLink size={10}/>
                </a>
            </div>

            <div className="bg-slate-800 rounded-lg p-3 mb-6 space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                    <span>Progress</span>
                    <span>
                        {project.isCompleted 
                            ? "100%" 
                            : `${Math.round(progressPercent)}%`}
                    </span>
                </div>

                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                        className={`h-full rounded-full transition-all duration-500 ${project.isCompleted ? 'bg-green-500' : 'bg-emerald-500'}`}
                        style={{ width: `${progressPercent}%` }}
                    ></div>
                </div>

                <p className="text-xs text-white font-medium truncate pt-1 flex items-center gap-2">
                    {project.isCompleted ? (
                        <span className="text-green-400 flex items-center gap-1"><CheckCircle size={12}/> Project Completed</span>
                    ) : (
                        <span className="text-emerald-400 flex items-center gap-1">
                            <Clock size={12}/> 
                            Step {project.currentMilestoneIndex + 1}: {project.milestones[project.currentMilestoneIndex]?.description}
                        </span>
                    )}
                </p>
            </div>

            <div className="mt-auto border-t border-slate-800 pt-4 flex justify-between items-center">
                <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Total Locked</p>
                    <p className="text-xl font-mono font-bold text-white">
                        {project.totalAmount} <span className="text-sm text-slate-500">USDY</span>
                    </p>
                </div>
                
                <Link 
                    className={`text-xs px-4 py-2 rounded font-semibold transition-colors border
                    ${project.isCompleted 
                        ? 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed' 
                        : 'bg-emerald-600/10 text-emerald-400 border-emerald-600/50 hover:bg-emerald-600 hover:text-white'}`}
                    to="#"
                >
                    {project.isCompleted ? "Archived" : "Manage"}
                </Link>
            </div>
        </div>
    )
}