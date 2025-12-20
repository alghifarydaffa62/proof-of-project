import { Link, useLocation } from 'react-router-dom'; 
import { 
  LayoutDashboard, 
  PlusCircle, 
  ShieldCheck,
} from 'lucide-react';

const menuItems = [
    { name: 'Dashboard', href:'/dashboard', icon: LayoutDashboard},
    { name: 'Create new Escrow', href: '/dashboard/create', icon: PlusCircle},
    { name: 'Active Escrows', href: '/dashboard/active', icon: PlusCircle}
]
export default function Sidebar() {
    const location = useLocation()
    const pathname = location.pathname

    return(
        <aside className="w-64 h-screen bg-slate-900 border-r border-slate-800 flex flex-col fixed left-0 top-0">
            <div className="h-16 flex items-center px-6 border-b border-slate-800">
                <ShieldCheck className="w-8 h-8 text-emerald-400 mr-2" />
                <span className="text-xl font-bold text-white tracking-wide">
                Proof of Project
                </span>
            </div>

            <nav className="flex-1 py-6 px-3 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link 
                            key={item.href}
                            to={item.href} 
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                                isActive 
                                ? 'bg-blue-600/10 text-blue-400 border-l-4 border-blue-500' 
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                        >
                        <Icon size={20} className={isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-white'} />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <div className="bg-slate-800/50 rounded-lg p-3">
                <p className="text-xs text-slate-500 uppercase font-semibold">System Status</p>
                <div className="flex items-center gap-2 mt-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs text-emerald-400">Mantle Sepolia: Online</span>
                </div>
                </div>
            </div>
        </aside>
    )
}