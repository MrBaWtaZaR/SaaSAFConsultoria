"use client"

import { useState } from 'react'
import { ArrowLeft, Calendar, Filter, Search, Plus, Clock, CheckCircle, AlertCircle, DollarSign, Trash, Edit, Eye } from 'lucide-react'
import Link from 'next/link'

// Dados simulados de contas a pagar administrativas (despesas da plataforma)
const mockAccounts = [
  {
    id: '1',
    description: 'Servidor AWS - Hospedagem',
    dueDate: '2023-06-25',
    amount: 1250.00,
    category: 'Infraestrutura',
    status: 'PENDING',
    paymentMethod: 'Cartão Corporativo',
    notes: 'Fatura mensal',
  },
  {
    id: '2',
    description: 'Salários Equipe de Desenvolvimento',
    dueDate: '2023-07-05',
    amount: 7500.00,
    category: 'Recursos Humanos',
    status: 'PENDING',
    paymentMethod: 'Transferência Bancária',
    notes: 'Folha de pagamento mensal',
  },
  {
    id: '3',
    description: 'Manutenção do Sistema de Segurança',
    dueDate: '2023-06-18',
    amount: 350.00,
    category: 'Infraestrutura',
    status: 'PAID',
    paymentMethod: 'Cartão Corporativo',
    notes: 'Serviço de monitoramento',
  },
  {
    id: '4',
    description: 'Licenças de Software',
    dueDate: '2023-06-20',
    amount: 780.00,
    category: 'Software',
    status: 'PENDING',
    paymentMethod: 'Cartão Corporativo',
    notes: 'Licenças anuais',
  },
  {
    id: '5',
    description: 'Aluguel do Escritório',
    dueDate: '2023-07-10',
    amount: 3200.00,
    category: 'Instalações',
    status: 'PENDING',
    paymentMethod: 'Débito Automático',
    notes: 'Aluguel mensal',
  },
  {
    id: '6',
    description: 'Marketing Digital - Anúncios',
    dueDate: '2023-06-15',
    amount: 1500.00,
    category: 'Marketing',
    status: 'OVERDUE',
    paymentMethod: 'Cartão Corporativo',
    notes: 'Campanha mensal',
  },
  {
    id: '7',
    description: 'Serviço de Contador',
    dueDate: '2023-06-30',
    amount: 800.00,
    category: 'Contabilidade',
    status: 'PENDING',
    paymentMethod: 'Transferência Bancária',
    notes: 'Honorários mensais',
  },
  {
    id: '8',
    description: 'Conta de Energia - Escritório',
    dueDate: '2023-06-28',
    amount: 420.00,
    category: 'Utilidades',
    status: 'PENDING',
    paymentMethod: 'Boleto',
    notes: 'Consumo mensal',
  },
]

// Status de contas e legendas
const accountStatusLabels: Record<string, string> = {
  PENDING: 'Pendente',
  PAID: 'Pago',
  OVERDUE: 'Atrasado',
  CANCELED: 'Cancelado',
}

// Status de contas para filtro
const accountStatuses = [
  { id: 'ALL', name: 'Todos' },
  { id: 'PENDING', name: 'Pendentes' },
  { id: 'PAID', name: 'Pagas' },
  { id: 'OVERDUE', name: 'Atrasadas' },
]

// Categorias para filtro
const expenseCategories = [
  { id: 'ALL', name: 'Todas' },
  { id: 'Infraestrutura', name: 'Infraestrutura' },
  { id: 'Recursos Humanos', name: 'Recursos Humanos' },
  { id: 'Software', name: 'Software' },
  { id: 'Marketing', name: 'Marketing' },
  { id: 'Instalações', name: 'Instalações' },
  { id: 'Utilidades', name: 'Utilidades' },
  { id: 'Contabilidade', name: 'Contabilidade' },
]

// Funções utilitárias
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR')
}

const formatCurrency = (value: number) => {
  return `R$ ${value.toFixed(2)}`
}

const getStatusIcon = (status: string) => {
  switch(status) {
    case 'PENDING':
      return <Clock size={16} className="text-yellow-500" />
    case 'PAID':
      return <CheckCircle size={16} className="text-green-500" />
    case 'OVERDUE':
      return <AlertCircle size={16} className="text-red-500" />
    default:
      return null
  }
}

// Verificar se uma conta está vencida
const isOverdue = (dueDate: string, status: string) => {
  if (status !== 'PENDING') return false
  const today = new Date()
  const due = new Date(dueDate)
  return due < today
}

// Atualizar status de contas vencidas
const updateAccountStatuses = (accounts: any[]) => {
  return accounts.map(account => {
    if (isOverdue(account.dueDate, account.status)) {
      return { ...account, status: 'OVERDUE' }
    }
    return account
  })
}

export default function AdminContasPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('ALL')
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [selectedPeriod, setSelectedPeriod] = useState('ALL')
  const [showAddModal, setShowAddModal] = useState(false)

  // Atualizar status de contas vencidas
  const updatedAccounts = updateAccountStatuses(mockAccounts)

  // Filtrar contas
  const filteredAccounts = updatedAccounts.filter(account => {
    const matchesSearch = 
      account.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())
    
    let matchesStatus = true
    if (selectedStatus !== 'ALL') {
      matchesStatus = account.status === selectedStatus
    }

    let matchesCategory = true
    if (selectedCategory !== 'ALL') {
      matchesCategory = account.category === selectedCategory
    }

    // Filtro por período
    let matchesPeriod = true
    const today = new Date()
    const dueDate = new Date(account.dueDate)
    
    if (selectedPeriod === 'THISWEEK') {
      const endOfWeek = new Date(today)
      endOfWeek.setDate(today.getDate() + (7 - today.getDay()))
      matchesPeriod = dueDate <= endOfWeek && dueDate >= today
    } else if (selectedPeriod === 'THISMONTH') {
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
      matchesPeriod = dueDate <= endOfMonth && dueDate >= today
    }
    
    return matchesSearch && matchesStatus && matchesCategory && matchesPeriod
  })

  // Calcular totais
  const totalPending = filteredAccounts
    .filter(account => account.status === 'PENDING')
    .reduce((sum, account) => sum + account.amount, 0)

  const totalPaid = filteredAccounts
    .filter(account => account.status === 'PAID')
    .reduce((sum, account) => sum + account.amount, 0)

  const totalOverdue = filteredAccounts
    .filter(account => account.status === 'OVERDUE')
    .reduce((sum, account) => sum + account.amount, 0)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center mb-6">
        <Link 
          href="/admin/financeiro" 
          className="flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} className="mr-1" /> Voltar para Financeiro
        </Link>
      </div>
      
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Contas a Pagar da Plataforma</h1>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md"
        >
          <Plus size={16} />
          <span>Nova Conta</span>
        </button>
      </div>

      {/* Resumo de contas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Despesas Pendentes</h3>
          <p className="text-xl font-bold text-yellow-600 mt-1">{formatCurrency(totalPending)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Despesas Pagas (Mês)</h3>
          <p className="text-xl font-bold text-green-600 mt-1">{formatCurrency(totalPaid)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Despesas Vencidas</h3>
          <p className="text-xl font-bold text-red-600 mt-1">{formatCurrency(totalOverdue)}</p>
        </div>
      </div>

      {/* Filtros e busca */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar contas..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-400" />
            <select
              className="block w-full py-2 pl-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {expenseCategories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-gray-400" />
            <select
              className="block w-full py-2 pl-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {accountStatuses.map((status) => (
                <option key={status.id} value={status.id}>{status.name}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-gray-400" />
            <select
              className="block w-full py-2 pl-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="ALL">Todos os períodos</option>
              <option value="THISWEEK">Esta semana</option>
              <option value="THISMONTH">Este mês</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de contas */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descrição
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vencimento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Método
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAccounts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    Nenhuma conta encontrada com os filtros selecionados
                  </td>
                </tr>
              ) : (
                filteredAccounts.map((account) => (
                  <tr key={account.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="mr-2 p-1 rounded-full bg-red-100">
                          <DollarSign size={14} className="text-red-600" />
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {account.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={14} className="mr-1" />
                        {formatDate(account.dueDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{account.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-red-600">
                        {formatCurrency(account.amount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(account.status)}
                        <span className={`ml-1 text-sm ${
                          account.status === 'PENDING' ? 'text-yellow-600' :
                          account.status === 'PAID' ? 'text-green-600' :
                          account.status === 'OVERDUE' ? 'text-red-600' : 'text-gray-500'
                        }`}>
                          {accountStatusLabels[account.status]}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{account.paymentMethod}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900" title="Ver detalhes">
                          <Eye size={18} />
                        </button>
                        <button className="text-indigo-600 hover:text-indigo-900" title="Editar">
                          <Edit size={18} />
                        </button>
                        <button className="text-red-600 hover:text-red-900" title="Excluir">
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para adicionar conta (simulado) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Adicionar Nova Despesa</h2>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mb-6 text-center text-gray-500">
              <p>Interface de adição de despesas (simulada)</p>
              <p className="mt-2">Em uma implementação real, aqui seria exibido um formulário para adicionar novas despesas da plataforma.</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowAddModal(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md"
              >
                Salvar Despesa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 