import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Hero() {
    return (
        <section id="home" className="relative pt-32 pb-20 lg:pb-32 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 bg-blue-900/20 rounded-full blur-[120px] -z-10"></div>

            <div className="container mx-auto px-6 text-center">
                <span className="inline-block py-1 px-3 rounded-full bg-blue-900/30 border border-blue-800 text-blue-400 text-xs font-semibold mb-6">
                    Web3 Escrow Service
                </span>
                
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                    Secure Your Work, <br />
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">
                        Guarantee Your Pay.
                    </span>
                </h1>

                <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                    The trustless way to manage freelance projects. Smart contracts ensure funds are locked upfront and released only when milestones are met.
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <ConnectButton/>
                    <a href="#about" className="py-2 px-8 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-semibold transition-all border border-slate-700">
                        Learn How It Works
                    </a>
                </div>
            </div>
        </section>
    );
}