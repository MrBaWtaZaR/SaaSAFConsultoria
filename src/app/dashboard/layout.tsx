"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  BarChart2, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  DollarSign
} from 'lucide-react'

const sidebarItems = [
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: LayoutDashboard 
  },
  { 
    name: 'Produtos', 
    href: '/dashboard/produtos', 
    icon: Package 
  },
  { 
    name: 'Clientes', 
    href: '/dashboard/clientes', 
    icon: Users 
  },
  { 
    name: 'Vendas', 
    href: '/dashboard/vendas', 
    icon: ShoppingCart 
  },
  { 
    name: 'Financeiro', 
    href: '/dashboard/financeiro', 
    icon: DollarSign 
  },
  { 
    name: 'Relatórios', 
    href: '/dashboard/relatorios', 
    icon: BarChart2 
  },
  { 
    name: 'Conta', 
    href: '/dashboard/conta', 
    icon: Settings 
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for mobile */}
      <div 
        className={`fixed inset-0 z-40 lg:hidden bg-gray-600 bg-opacity-75 transition-opacity ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:inset-auto transition-transform duration-300 ease-in-out`}
      >
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center justify-between px-4 border-b">
            <h1 className="font-bold text-xl text-primary">AF Consultoria</h1>
            <button 
              className="lg:hidden" 
              onClick={() => setSidebarOpen(false)}
            >
              <X size={24} />
            </button>
          </div>
          <nav className="flex-1 py-4 overflow-y-auto">
            <ul className="space-y-1 px-2">
              {sidebarItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-sm rounded-md ${
                      pathname === item.href
                        ? 'text-primary bg-primary/10 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon size={18} className="mr-3" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t">
            <button
              className="flex items-center text-sm text-gray-700 hover:text-primary w-full px-4 py-3 rounded-md hover:bg-gray-100"
              onClick={() => {
                // Em uma implementação real, isso faria logout
                window.location.href = '/auth/login'
              }}
            >
              <LogOut size={18} className="mr-3" />
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="bg-white shadow h-16 flex items-center">
          <div className="flex items-center justify-between w-full px-6">
            <button 
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            
            <div className="flex items-center space-x-4">
              {/* Em uma implementação real, aqui teria o avatar e nome do usuário */}
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                U
              </div>
              <span className="text-sm font-medium">Usuário Demo</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
} 