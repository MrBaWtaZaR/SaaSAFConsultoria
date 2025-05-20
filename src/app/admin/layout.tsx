"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  BarChart2, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Package 
} from 'lucide-react'

const sidebarItems = [
  { 
    name: 'Dashboard', 
    href: '/admin', 
    icon: LayoutDashboard 
  },
  { 
    name: 'Clientes', 
    href: '/admin/clientes', 
    icon: Users 
  },
  { 
    name: 'Assinaturas', 
    href: '/admin/assinaturas', 
    icon: CreditCard 
  },
  {
    name: 'Planos',
    href: '/admin/planos',
    icon: Package
  },
  { 
    name: 'Financeiro', 
    href: '/admin/financeiro', 
    icon: BarChart2 
  },
  { 
    name: 'Configurações', 
    href: '/admin/configuracoes', 
    icon: Settings 
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminName, setAdminName] = useState('')

  useEffect(() => {
    // Verificar autenticação
    const adminToken = sessionStorage.getItem('admin_token')
    const name = sessionStorage.getItem('admin_name')
    
    setIsAuthenticated(!!adminToken)
    setAdminName(name || 'Admin')
    
    // Se não estiver autenticado, redirecionar para a página de login principal
    if (!adminToken) {
      // Armazenar a URL atual para redirecionamento após o login
      if (pathname !== '/admin') {
        sessionStorage.setItem('adminRedirectUrl', pathname)
      }
      router.push('/auth/login')
    }
  }, [pathname, router])

  // Se não estiver autenticado, não renderizar o layout admin
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar para mobile */}
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
            <h1 className="font-bold text-xl text-primary">AF Admin</h1>
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
                // Logout
                sessionStorage.removeItem('admin_token')
                sessionStorage.removeItem('admin_name')
                sessionStorage.removeItem('adminRedirectUrl')
                router.push('/auth/login')
              }}
            >
              <LogOut size={18} className="mr-3" />
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navegação superior */}
        <header className="bg-white shadow h-16 flex items-center">
          <div className="flex items-center justify-between w-full px-6">
            <button 
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                {adminName.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium">{adminName}</span>
            </div>
          </div>
        </header>

        {/* Conteúdo da página */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
} 