import { Wallet, FileText, Layers, CheckCircle } from "lucide-react";

const services = [
    {
        icon: <Wallet className="w-8 h-8 text-blue-400" />,
        title: "Milestone Payments",
        desc: "Break down large projects into smaller steps. Get paid as you complete each phase."
    },
    {
        icon: <FileText className="w-8 h-8 text-purple-400" />,
        title: "Smart Contracts",
        desc: "Automated agreements that execute exactly as written. No hidden clauses."
    },
    {
        icon: <Layers className="w-8 h-8 text-cyan-400" />,
        title: "Stablecoin Support",
        desc: "Transactions use USDY (Yield Dollar) to avoid crypto volatility. 1 USDY = 1 USD."
    },
    {
        icon: <CheckCircle className="w-8 h-8 text-emerald-400" />,
        title: "Instant Settlement",
        desc: "No waiting for bank processing days. Funds arrive in your wallet seconds after approval."
    }
];

export default function Services() {
    return (
        <section id="services" className="py-24 bg-[#0f172a]">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Services</h2>
                    <p className="text-slate-400 max-w-xl mx-auto">Everything you need to manage secure collaborations in the Web3 era.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, idx) => (
                        <div key={idx} className="bg-[#0B1120] p-6 rounded-xl border border-slate-800 hover:border-blue-600/50 transition-all hover:-translate-y-1 group">
                            <div className="mb-4 bg-slate-900 w-fit p-3 rounded-lg group-hover:bg-blue-900/20 transition-colors">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}