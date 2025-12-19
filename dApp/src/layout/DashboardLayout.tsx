import Sidebar from "../component/Sidebar"
import { Outlet } from "react-router-dom"
import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function DashboardLayout() {
    return(
        <div className="min-h-screen bg-slate-950 flex">
            <Sidebar />

            <div className="flex-1 flex flex-col pl-64">
                <header className="h-16 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 sticky top-0 z-10 flex items-center justify-between px-8">
                    <h2 className="text-slate-200 font-medium">Dashboard Area</h2>
                    <ConnectButton showBalance={false} />
                </header>

                <main className="flex-1 p-8 overflow-y-auto">
                    <Outlet/> 
                </main>
            </div>
        </div>
    )
}