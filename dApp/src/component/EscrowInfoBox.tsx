import { User, Shield, FileText, ExternalLink, DollarSign } from "lucide-react";
import { EscrowInfoProps } from "../types";

export default function EscrowInfoBox({info}: {info: EscrowInfoProps}) {
    return(
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6 h-fit sticky top-6">
            <div>
                <h2 className="text-xl font-bold text-white mb-1">{info.name}</h2>
                <span className="text-xs font-mono text-slate-500 bg-slate-800 px-2 py-1 rounded">ID: #{info.id}</span>
            </div>

            <div className="space-y-4">
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                    <p className="text-xs text-slate-400 mb-1 flex items-center gap-1"><DollarSign size={12}/> Total Contract Value</p>
                    <p className="text-2xl font-mono font-bold text-emerald-400">{info.totalAmount} USDY</p>
                </div>

                <div className="space-y-3 pt-2">
                    <div>
                        <p className="text-xs text-slate-500 mb-1 flex items-center gap-1"><User size={12}/> Client Address</p>
                        <p className="text-xs font-mono text-blue-400 bg-blue-900/10 p-2 rounded break-all border border-blue-900/20">{info.client.slice(0, 10)}...{info.client.slice(-10)}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 mb-1 flex items-center gap-1"><Shield size={12}/> Vendor Address</p>
                        <p className="text-xs font-mono text-purple-400 bg-purple-900/10 p-2 rounded break-all border border-purple-900/20">{info.vendor.slice(0, 10)}...{info.vendor.slice(-10)}</p>
                    </div>
                </div>
            </div>

            <div className="border-t border-slate-800 pt-4">
                <a 
                    href={info.documentLink} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-lg transition-colors text-sm font-medium border border-slate-700"
                >
                    <FileText size={16}/> View Contract PDF <ExternalLink size={14}/>
                </a>
            </div>
        </div>
    )
}