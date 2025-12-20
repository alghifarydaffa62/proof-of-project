import { ShieldCheck, Lock } from "lucide-react";

export default function About() {
    return (
        <section id="about" className="py-20 bg-[#0B1120]">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Why Trust <span className="text-blue-500">Code</span> Over Humans?
                        </h2>
                        <p className="text-slate-400 mb-6 leading-relaxed">
                            Traditional escrow services are slow, expensive, and require a middleman. 
                            **Proof of Project** removes the middleman entirely. We use Blockchain Smart Contracts 
                            to hold funds securely.
                        </p>
                        <p className="text-slate-400 mb-8 leading-relaxed">
                            Clients prove they have the funds by locking them upfront. Vendors prove they 
                            did the work by submitting milestones. Approval releases funds instantly.
                        </p>
                        
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="text-emerald-400" />
                                <span className="text-slate-200">100% Trustless & Transparent</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Lock className="text-emerald-400" />
                                <span className="text-slate-200">Funds Locked On-Chain</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-600 blur-[80px] opacity-20 rounded-full"></div>
                        <div className="relative bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl">
                            <div className="flex items-center gap-4 mb-6 border-b border-slate-800 pb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="space-y-4 font-mono text-sm">
                                <p className="text-blue-400">status: <span className="text-green-400">"Funds_Locked"</span></p>
                                <p className="text-slate-500">// Waiting for milestone completion...</p>
                                <div className="p-3 bg-slate-950 rounded border border-slate-800 text-slate-300">
                                    project_value: <span className="text-white font-bold">1,000 USDY</span>
                                </div>
                                <button className="w-full py-2 bg-emerald-600/20 text-emerald-400 border border-emerald-600/50 rounded mt-2">
                                    Release Funds
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}