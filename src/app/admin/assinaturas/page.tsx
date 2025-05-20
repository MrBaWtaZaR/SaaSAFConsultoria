"use client"

import { useState } from 'react'
import { Search, Filter, Edit, CheckCircle, XCircle, Calendar, CreditCard, AlertTriangle } from 'lucide-react'

// Dados mockados de assinaturas
const mockSubscriptions = [
  {
    id: '1',
    clientId: '1',
    clientName: 'Loja Elegância Moda',
    plan: 'Profissional',
    status: 'ACTIVE',
    price: 99.90,
    billingCycle: 'monthly',
    startDate: '2023-01-15T00:00:00.000Z',
    nextBillingDate: '2023-06-15T00:00:00.000Z',
    paymentMethod: 'credit_card',
    paymentStatus: 'PAID'
  },
  {
    id: '2',
    clientId: '2',
    clientName: 'Fashion Store',
    plan: 'Básico',
    status: 'ACTIVE',
    price: 49.90,
    billingCycle: 'monthly',
    startDate: '2023-02-20T00:00:00.000Z',
    nextBillingDate: '2023-06-20T00:00:00.000Z',
    paymentMethod: 'credit_card',
    paymentStatus: 'PAID'
  },
  {
    id: '3',
    clientId: '3',
    clientName: 'Boutique Chique',
    plan: 'Profissional',
    status: 'ACTIVE',
    price: 959.00,
    billingCycle: 'yearly',
    startDate: '2023-03-10T00:00:00.000Z',
    nextBillingDate: '2024-03-10T00:00:00.000Z',
    paymentMethod: 'credit_card',
    paymentStatus: 'PAID'
  },
  {
    id: '4',
    clientId: '4',
    clientName: 'Moda Atual',
    plan: 'Básico',
    status: 'INACTIVE',
    price: 49.90,
    billingCycle: 'monthly',
    startDate: '2023-01-05T00:00:00.000Z',
    nextBillingDate: '2023-05-05T00:00:00.000Z',
    paymentMethod: 'credit_card',
    paymentStatus: 'FAILED'
  },
  {
    id: '5',
    clientId: '5',
    clientName: 'Roupas & Cia',
    plan: 'Gratuito',
    status: 'ACTIVE',
    price: 0.00,
    billingCycle: 'monthly',
    startDate: '2023-04-15T00:00:00.000Z',
    nextBillingDate: null,
    paymentMethod: null,
    paymentStatus: null
  }
];

// Planos disponíveis
const plans = [
  { id: 'free', name: 'Gratuito', price: 0.00 },
  { id: 'basic', name: 'Básico', price: 49.90 },
  { id: 'pro', name: 'Profissional', price: 99.90 }
];

export default function SubscriptionsPage() {
  // Estados para filtragem
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [planFilter, setPlanFilter] = useState('all')
  const [showEditModal, setShowEditModal] = useState(false)
  const [currentSubscription, setCurrentSubscription] = useState<any>(null)
  
  // Formatação de data
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '—'
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR')
  }
  
  // Formatação de valor
  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2)}`
  }
  
  // Filtrar assinaturas
  const filteredSubscriptions = mockSubscriptions.filter(subscription => {
    const matchesSearch = 
      subscription.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && subscription.status === 'ACTIVE') ||
      (statusFilter === 'inactive' && subscription.status === 'INACTIVE')
    
    const matchesPlan = planFilter === 'all' || subscription.plan === planFilter
    
    return matchesSearch && matchesStatus && matchesPlan
  })
  
  // Abrir modal de edição
  const handleEditSubscription = (subscription: any) => {
    setCurrentSubscription({...subscription})
    setShowEditModal(true)
  }
  
  // Salvar alterações
  const handleSaveEdit = () => {
    // Em uma implementação real, aqui faria uma chamada de API
    // Aqui estamos apenas simulando a atualização no estado local
    setShowEditModal(false)
  }

  return (
    <div className="p-6 space-y-6 dark:bg-gray-900">
      <h1 className="text-2xl font-bold dark:text-white">Assinaturas</h1>
      
      {/* Filtros e busca */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar cliente..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-400" />
          <select
            className="block w-full py-2 pl-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Todos os Status</option>
            <option value="active">Ativos</option>
            <option value="inactive">Inativos</option>
          </select>
        </div>
        
        <div>
          <select
            className="block w-full py-2 pl-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
          >
            <option value="all">Todos os Planos</option>
            <option value="Gratuito">Gratuito</option>
            <option value="Básico">Básico</option>
            <option value="Profissional">Profissional</option>
          </select>
        </div>
      </div>
      
      {/* Lista de assinaturas */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Plano
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Preço
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Início
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Próxima Cobrança
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredSubscriptions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    Nenhuma assinatura encontrada
                  </td>
                </tr>
              ) : (
                filteredSubscriptions.map((subscription) => (
                  <tr key={subscription.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{subscription.clientName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{subscription.plan}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {subscription.billingCycle === 'monthly' ? 'Mensal' : 'Anual'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {subscription.status === 'ACTIVE' ? (
                          <>
                            <CheckCircle size={16} className="text-green-500 mr-1" />
                            <span className="text-sm text-green-700 dark:text-green-400">Ativo</span>
                          </>
                        ) : (
                          <>
                            <XCircle size={16} className="text-red-500 mr-1" />
                            <span className="text-sm text-red-700 dark:text-red-400">Inativo</span>
                          </>
                        )}
                      </div>
                      
                      {subscription.paymentStatus === 'FAILED' && (
                        <div className="flex items-center mt-1">
                          <AlertTriangle size={16} className="text-amber-500 mr-1" />
                          <span className="text-xs text-amber-700 dark:text-amber-400">Pagamento falhou</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatCurrency(subscription.price)}
                        <span className="font-normal text-gray-500 dark:text-gray-400 text-xs">
                          {subscription.billingCycle === 'monthly' ? '/mês' : '/ano'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{formatDate(subscription.startDate)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{formatDate(subscription.nextBillingDate)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => handleEditSubscription(subscription)}
                        className="text-primary hover:text-primary/80 dark:text-primary dark:hover:text-primary/80"
                      >
                        <Edit size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Modal de edição */}
      {showEditModal && currentSubscription && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Editar Assinatura</h3>
              <div className="mt-2 px-7 py-3">
                <div className="space-y-4">
                  <div className="text-left">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Cliente
                    </label>
                    <input
                      type="text"
                      className="w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary/20 dark:bg-gray-700 dark:text-white"
                      value={currentSubscription.clientName}
                      disabled
                    />
                  </div>
                  
                  <div className="text-left">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Plano
                    </label>
                    <select
                      className="w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary/20 dark:bg-gray-700 dark:text-white"
                      value={currentSubscription.plan}
                      onChange={(e) => setCurrentSubscription({...currentSubscription, plan: e.target.value})}
                    >
                      {plans.map(plan => (
                        <option key={plan.id} value={plan.name}>{plan.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="text-left">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Status
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio text-primary"
                          name="status"
                          value="ACTIVE"
                          checked={currentSubscription.status === 'ACTIVE'}
                          onChange={() => setCurrentSubscription({...currentSubscription, status: 'ACTIVE'})}
                        />
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Ativo</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio text-primary"
                          name="status"
                          value="INACTIVE"
                          checked={currentSubscription.status === 'INACTIVE'}
                          onChange={() => setCurrentSubscription({...currentSubscription, status: 'INACTIVE'})}
                        />
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Inativo</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 px-4 py-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 