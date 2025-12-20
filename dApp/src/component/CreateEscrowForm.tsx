import { useState } from "react";
import { useCreateEscrow } from "../hooks/useCreateEscrow";
import { uploadIPFS } from "../utils/uploadIPFS";
import { Plus, FileText, Wallet, Shield } from "lucide-react";

export default function CreateEscrowForm() {
    const {
        title, setTitle,
        documentLink, setDocumentLink,
        vendor, setVendor,
        milestones, addMilestone,
        handleApprove, isApprovePending, isApproveConfirming, isApproveSuccess,
        handleCreate, isCreatePending, isCreateConfirming
    } = useCreateEscrow()

    const [MilestoneName, setMilestoneName] = useState("")
    const [MilestoneAmount, setMilestoneAmount] = useState("")
    const [isUploading, setIsUploading] = useState(false)
    
    const totalCost = milestones.reduce((acc, curr) => acc + Number(curr.amount), 0);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if(!file) return

        setIsUploading(true)

        try {
            const url = await uploadIPFS(file)
            if(url) {
                setDocumentLink(url)
            }
        } catch (error) {
            console.error("error uploading file: ", error)
        } finally {
            setIsUploading(false)
        }
    }

    const handleAddMilestone = () => {
        addMilestone(MilestoneName, MilestoneAmount)
        setMilestoneName("")
        setMilestoneAmount("")
    }

    return(
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                    <Shield className="text-emerald-400"/> Create New Escrow
                </h1>
                <p className="text-slate-400 mt-2">Buat kontrak proyek baru, atur termin pembayaran, dan kunci dana dengan aman.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-6 h-fit">
                    <h2 className="text-xl font-semibold text-white border-b border-slate-800 pb-4">Project Details</h2>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Project Title</label>
                        <input 
                            type="text" 
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                            placeholder="Contoh: Instalasi Server Gedung B"
                            value={title} onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Vendor Address (Wallet)</label>
                        <input 
                            type="text" 
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-mono text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors font-mono text-sm"
                            placeholder="0x..."
                            value={vendor} onChange={(e) => setVendor(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Contract Document (PDF)</label>
                        <div className="relative">
                            <input 
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                disabled={isUploading}
                                className="block w-full text-sm text-slate-400
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-lg file:border-0
                                file:text-sm file:font-semibold
                                file:bg-slate-700 file:text-white
                                hover:file:bg-slate-600
                                cursor-pointer bg-slate-800 rounded-lg border border-slate-700"
                            />
                        </div>
                        {isUploading && <p className="text-yellow-400 text-xs mt-2 animate-pulse">Uploading to IPFS...</p>}
                        {documentLink && (
                            <div className="mt-2 text-sm text-emerald-400 flex items-center gap-2 bg-emerald-900/20 p-2 rounded border border-emerald-900">
                                <FileText size={16}/> 
                                <span>Document Verified & Uploaded</span>
                                <a href={documentLink} target="_blank" className="underline ml-auto text-xs">View</a>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-6">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                        <h2 className="text-xl font-semibold text-white">Payment Milestones</h2>
                        <span className="text-sm bg-slate-800 px-3 py-1 rounded-full text-slate-300">
                            Total: <span className="text-emerald-400 font-bold">{totalCost} USDY</span>
                        </span>
                    </div>

                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 space-y-3">
                        <input 
                            type="text" 
                            placeholder="Nama Termin (Misal: DP 30%)"
                            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white text-sm"
                            value={MilestoneName} onChange={e => setMilestoneName(e.target.value)}
                        />
                        <div className="flex gap-2">
                            <input 
                                type="number" 
                                placeholder="Jumlah (USDY)"
                                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white text-sm"
                                value={MilestoneAmount} onChange={e => setMilestoneAmount(e.target.value)}
                            />
                            <button 
                                onClick={handleAddMilestone}
                                className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded transition-colors"
                            >
                                <Plus size={20}/>
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2 max-h-75 overflow-y-auto pr-2">
                        {milestones.length === 0 && (
                            <p className="text-center text-slate-600 text-sm py-4 italic">Belum ada milestone.</p>
                        )}
                        {milestones.map((m, idx) => (
                            <div key={idx} className="flex justify-between items-center bg-slate-800 p-3 rounded border border-slate-700">
                                <div>
                                    <p className="text-slate-200 font-medium text-sm">{m.name}</p>
                                    <p className="text-slate-500 text-xs">Step {idx + 1}</p>
                                </div>
                                <span className="font-mono text-emerald-400 font-bold">{m.amount} USDY</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="border-t border-slate-800 pt-8 flex flex-col items-end gap-4">
                <div className="flex items-center gap-8 text-sm">
                    <div className={`flex items-center gap-2 ${isApproveSuccess ? 'text-emerald-500' : 'text-white'}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${isApproveSuccess ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-slate-500'}`}>1</div>
                        <span>Approve Token</span>
                    </div>
                    <div className="w-12 h-[1px] bg-slate-700"></div>
                    <div className={`flex items-center gap-2 ${!isApproveSuccess ? 'text-slate-500' : 'text-white'}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${!isApproveSuccess ? 'border-slate-700' : 'bg-blue-600 border-blue-600'}`}>2</div>
                        <span>Create Project</span>
                    </div>
                </div>

                <div className="flex gap-4">
                    {!isApproveSuccess && (
                        <button 
                            onClick={handleApprove}
                            disabled={isApprovePending || isApproveConfirming || totalCost <= 0}
                            className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-500 disabled:bg-slate-700 disabled:text-slate-500 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-yellow-900/20"
                        >
                            {isApprovePending || isApproveConfirming ? (
                                <>Processing...</>
                            ) : (
                                <><Wallet size={20}/> Approve {totalCost > 0 ? `${totalCost} USDY` : ''}</>
                            )}
                        </button>
                    )}

                    <button 
                        onClick={handleCreate}
                        disabled={!isApproveSuccess || isCreatePending || isCreateConfirming || !documentLink} 
                        className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all shadow-lg 
                            ${!isApproveSuccess 
                                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' 
                                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/20'
                            }`}
                    >
                         {isCreatePending || isCreateConfirming ? 'Creating...' : 'Create Escrow Project'}
                    </button>
                </div>

                {!documentLink && <p className="text-red-400 text-xs">⚠️ Upload dokumen kontrak dulu sebelum membuat project.</p>}
            </div>

        </div>
    )
}