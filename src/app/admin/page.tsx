"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Simulação de verificação de autenticação de administrador
const checkAdminAuth = () => {
  // Em uma implementação real, isso verificaria tokens JWT ou cookies
  const isAdmin = sessionStorage.getItem('admin_token')
  return !!isAdmin
}

export default function AdminDashboard() {
  const router = useRouter()
  
  useEffect(() => {
    // Verificar se o usuário está autenticado como admin
    if (!checkAdminAuth()) {
      router.push('/admin/login')
    }
  }, [router])

  return (
    <div className="p-6 space-y-6 dark:bg-gray-900">
      <h1 className="text-2xl font-bold dark:text-white">Painel Administrativo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card de Clientes */}
        <div 
          onClick={() => router.push('/admin/clientes')}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 cursor-pointer hover:shadow-md transition-shadow"
        >
          <h2 className="text-lg font-medium mb-2 dark:text-white">Clientes</h2>
          <p className="text-4xl font-bold text-primary">27</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Total de clientes ativos</p>
        </div>
        
        {/* Card de Assinaturas */}
        <div 
          onClick={() => router.push('/admin/assinaturas')}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 cursor-pointer hover:shadow-md transition-shadow"
        >
          <h2 className="text-lg font-medium mb-2 dark:text-white">Assinaturas</h2>
          <p className="text-4xl font-bold text-green-600 dark:text-green-500">23</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Assinaturas ativas</p>
        </div>
        
        {/* Card de Receita */}
        <div 
          onClick={() => router.push('/admin/financeiro')}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 cursor-pointer hover:shadow-md transition-shadow"
        >
          <h2 className="text-lg font-medium mb-2 dark:text-white">Receita Mensal</h2>
          <p className="text-4xl font-bold text-blue-600 dark:text-blue-500">R$ 4.780</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Faturamento recorrente</p>
        </div>
      </div>
      
      {/* Atividades recentes */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b dark:border-gray-700">
          <h2 className="text-lg font-medium dark:text-white">Atividades Recentes</h2>
        </div>
        <div className="p-6">
          <ul className="space-y-4">
            <li className="pb-4 border-b border-gray-100 dark:border-gray-700">
              <p className="text-sm dark:text-gray-200">
                <span className="font-medium dark:text-white">Novo cliente</span> - Loja ABC Modas se cadastrou
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Há 2 horas atrás</p>
            </li>
            <li className="pb-4 border-b border-gray-100 dark:border-gray-700">
              <p className="text-sm dark:text-gray-200">
                <span className="font-medium dark:text-white">Upgrade de plano</span> - Moda Atual mudou para plano Profissional
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Há 5 horas atrás</p>
            </li>
            <li className="pb-4 border-b border-gray-100 dark:border-gray-700">
              <p className="text-sm dark:text-gray-200">
                <span className="font-medium dark:text-white">Cancelamento</span> - Boutique Elegance cancelou assinatura
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Ontem às 15:30</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
} 