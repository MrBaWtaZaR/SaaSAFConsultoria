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
    <div className="p-6 space-y-6 dark:bg-gray-900">
      <h1 className="text-2xl font-bold dark:text-white">Configurações da Conta</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Navegação lateral */}
        <div className="w-full md:w-64 bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <nav className="p-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center w-full px-4 py-3 rounded-md mb-1 text-left ${
                activeTab === 'profile' 
                  ? 'bg-primary/10 text-primary' 
                  : 'hover:bg-gray-100 text-gray-700 dark:hover:bg-gray-700 dark:text-gray-300'
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
                  : 'hover:bg-gray-100 text-gray-700 dark:hover:bg-gray-700 dark:text-gray-300'
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
                  : 'hover:bg-gray-100 text-gray-700 dark:hover:bg-gray-700 dark:text-gray-300'
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
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-lg font-medium mb-6 dark:text-white">Informações de Perfil</h2>
              
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Nome
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    defaultValue={user.name}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    E-mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    defaultValue={user.email}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
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
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-lg font-medium mb-6 dark:text-white">Alterar Senha</h2>
              
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label 
                    htmlFor="currentPassword" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Senha Atual
                  </label>
                  <input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label 
                    htmlFor="newPassword" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Nova Senha
                  </label>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label 
                    htmlFor="confirmPassword" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Confirmar Nova Senha
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
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
                        <span>Alterando senha...</span>
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
            <div className="space-y-6">
              {/* Resumo do plano atual */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-lg font-medium mb-6 dark:text-white">Detalhes da Assinatura</h2>
                
                <div className="space-y-4">
                  <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          Plano {currentPlan.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {subscription.status === 'ACTIVE' ? 'Assinatura ativa' : 'Assinatura inativa'}
                        </p>
                      </div>
                      <span className="text-xl font-bold text-primary">
                        {currentPlan.price > 0 ? `R$ ${currentPlan.price.toFixed(2)}/mês` : 'Gratuito'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Data de início</p>
                        <p className="text-sm font-medium dark:text-white">{formatDate(subscription.startDate)}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Próximo pagamento</p>
                        <p className="text-sm font-medium dark:text-white">
                          {subscription.nextPayment ? formatDate(subscription.nextPayment) : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Benefícios incluídos:</h4>
                    <ul className="space-y-1">
                      {currentPlan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-600 dark:text-gray-400">
                          <Package size={16} className="text-primary mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-4">
                    <Link
                      href="/dashboard/planos"
                      className="flex items-center justify-between bg-primary/10 hover:bg-primary/20 text-primary py-2 px-4 rounded-md"
                    >
                      <span>Ver outros planos disponíveis</span>
                      <ChevronRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Método de Pagamento */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-lg font-medium mb-6 dark:text-white">Método de Pagamento</h2>
                
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <CreditCard size={20} className="text-gray-500 dark:text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Cartão de Crédito terminando em 4242</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Expira em 12/2024</p>
                      </div>
                    </div>
                    <button className="text-primary text-sm hover:underline">
                      Editar
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Histórico de pagamentos */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b dark:border-gray-700">
                  <h2 className="text-lg font-medium dark:text-white">Histórico de Pagamentos</h2>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Data
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Descrição
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Valor
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          15/05/2023
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          Assinatura Plano {currentPlan.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          R$ {currentPlan.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            Pago
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          15/04/2023
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          Assinatura Plano {currentPlan.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          R$ {currentPlan.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            Pago
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 