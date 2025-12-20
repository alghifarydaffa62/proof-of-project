import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#050914] border-t border-slate-800 pt-16 pb-8">
            <div className="container mx-auto px-6 text-center md:text-left">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                    <div className="mb-6 md:mb-0">
                        <h2 className="text-2xl font-bold text-white mb-2">Proof of Project</h2>
                        <p className="text-slate-500 text-sm">Decentralized Escrow on Mantle Network.</p>
                    </div>
                    
                    <div className="flex gap-6">
                        <a href="#" className="text-slate-400 hover:text-white transition-colors"><Github size={20}/></a>
                        <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors"><Twitter size={20}/></a>
                        <a href="#" className="text-slate-400 hover:text-blue-700 transition-colors"><Linkedin size={20}/></a>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-600">
                    <p>&copy; 2025 Proof of Project. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-slate-400">Privacy Policy</a>
                        <a href="#" className="hover:text-slate-400">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}