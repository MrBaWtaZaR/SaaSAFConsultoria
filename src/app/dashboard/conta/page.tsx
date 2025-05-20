"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Save, CreditCard, User, Key, Package, ChevronRight } from 'lucide-react'

// Usuário mockado
const mockUser = {
  id: '1',
  name: 'Usuário Demo',
  email: 'usuario@demo.com',
  createdAt: '2023-01-15T00:00:00.000Z',
}

// Plano atual mockado
const mockSubscription = {
  id: '1',
  status: 'ACTIVE',
  planId: '2',
  startDate: '2023-01-15T00:00:00.000Z',
  endDate: '2024-01-15T00:00:00.000Z',
  nextPayment: '2023-06-15T00:00:00.000Z',
}

// Planos disponíveis
const mockPlans = [
  {
    id: '1',
    name: 'Gratuito',
    price: 0,
    priceYearly: 0,
    productLimit: 30,
    clientLimit: 15,
    features: [
      'Até 30 produtos',
      'Até 15 clientes',
      'Gestão de vendas básica',
    ],
  },
  {
    id: '2',
    name: 'Básico',
    price: 49.90,
    priceYearly: 479.00,
    productLimit: 300,
    clientLimit: 150,
    features: [
      'Até 300 produtos',
      'Até 150 clientes',
      'Relatórios avançados',
      'Suporte por email',
    ],
  },
  {
    id: '3',
    name: 'Profissional',
    price: 99.90,
    priceYearly: 959.00,
    productLimit: 1000,
    clientLimit: 500,
    features: [
      'Produtos e clientes ilimitados',
      'Relatórios avançados',
      'Gestão de estoque avançada',
      'Suporte prioritário',
      'Backup diário',
    ],
  },
]

// Formatar data para exibição
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR')
}

export default function AccountPage() {
  const [user, setUser] = useState(mockUser)
  const [subscription, setSubscription] = useState(mockSubscription)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  
  const currentPlan = mockPlans.find(plan => plan.id === subscription.planId) || mockPlans[0]

  const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    // Em uma implementação real, aqui enviaria os dados para a API
    setTimeout(() => {
      setLoading(false)
      alert('Perfil atualizado com sucesso!')
    }, 1000)
  }
  
  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    // Em uma implementação real, aqui enviaria os dados para a API
    setTimeout(() => {
      setLoading(false)
      alert('Senha atualizada com sucesso!')
      
      // Limpar os campos
      const form = e.target as HTMLFormElement
      form.reset()
    }, 1000)
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Configurações da Conta</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Navegação lateral */}
        <div className="w-full md:w-64 bg-white rounded-lg shadow overflow-hidden">
          <nav className="p-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center w-full px-4 py-3 rounded-md mb-1 text-left ${
                activeTab === 'profile' 
                  ? 'bg-primary/10 text-primary' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <User size={18} className="mr-3" />
              <span>Perfil</span>
            </button>
            
            <button
              onClick={() => setActiveTab('password')}
              className={`flex items-center w-full px-4 py-3 rounded-md mb-1 text-left ${
                activeTab === 'password' 
                  ? 'bg-primary/10 text-primary' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Key size={18} className="mr-3" />
              <span>Alterar Senha</span>
            </button>
            
            <button
              onClick={() => setActiveTab('subscription')}
              className={`flex items-center w-full px-4 py-3 rounded-md mb-1 text-left ${
                activeTab === 'subscription' 
                  ? 'bg-primary/10 text-primary' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <CreditCard size={18} className="mr-3" />
              <span>Assinatura</span>
            </button>
          </nav>
        </div>
        
        {/* Conteúdo principal */}
        <div className="flex-1">
          {/* Perfil */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium mb-6">Informações de Perfil</h2>
              
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nome
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    defaultValue={user.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    E-mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    defaultValue={user.email}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        <span>Salvando...</span>
                      </>
                    ) : (
                      <>
                        <Save size={18} className="mr-2" />
                        <span>Salvar Alterações</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Senha */}
          {activeTab === 'password' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium mb-6">Alterar Senha</h2>
              
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label 
                    htmlFor="currentPassword" 
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Senha Atual
                  </label>
                  <input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div>
                  <label 
                    htmlFor="newPassword" 
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nova Senha
                  </label>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div>
                  <label 
                    htmlFor="confirmPassword" 
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirmar Nova Senha
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        <span>Salvando...</span>
                      </>
                    ) : (
                      <>
                        <Save size={18} className="mr-2" />
                        <span>Alterar Senha</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Assinatura */}
          {activeTab === 'subscription' && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-lg font-medium">Informações da Assinatura</h2>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-gray-600">Plano atual:</span>
                  <span className="font-medium text-primary">{currentPlan.name}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status:</span>
                  <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                    Ativo
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Data de início:</span>
                  <span>{formatDate(subscription.startDate)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Próxima cobrança:</span>
                  <span>{formatDate(subscription.nextPayment)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Valor mensal:</span>
                  <span className="font-medium">R$ {currentPlan.price.toFixed(2)}</span>
                </div>
                
                <div className="pt-4">
                  <Link 
                    href="/dashboard/conta/mudar-plano" 
                    className="flex items-center justify-between w-full bg-primary/5 hover:bg-primary/10 text-primary py-3 px-4 rounded-md"
                  >
                    <div className="flex items-center">
                      <Package size={18} className="mr-2" />
                      <span>Alterar meu plano</span>
                    </div>
                    <ChevronRight size={18} />
                  </Link>
                </div>
                
                <div className="pt-2">
                  <button className="flex items-center justify-between w-full bg-red-50 hover:bg-red-100 text-red-700 py-3 px-4 rounded-md">
                    <div className="flex items-center">
                      <CreditCard size={18} className="mr-2" />
                      <span>Cancelar assinatura</span>
                    </div>
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
              
              <div className="p-6 bg-gray-50 border-t">
                <h3 className="font-medium mb-2">Detalhes do Plano {currentPlan.name}</h3>
                <ul className="space-y-2">
                  {currentPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 