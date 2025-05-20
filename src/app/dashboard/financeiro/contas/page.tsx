"use client"

import { useState } from 'react'
import { ArrowLeft, Calendar, Filter, Search, Plus, Clock, CheckCircle, AlertCircle, DollarSign, Trash, Edit, Eye, ChevronDown } from 'lucide-react'
import Link from 'next/link'

// Dados simulados de contas a pagar e receber
const mockAccounts = [
  {
    id: '1',
    description: 'Pagamento Fornecedor - Têxtil Brasil',
    dueDate: '2023-06-25',
    amount: 1850.00,
    type: 'PAYABLE', // A pagar
    category: 'Fornecedores',
    status: 'PENDING',
    paymentMethod: 'Transferência Bancária',
    notes: 'Referente à compra de 15/05/2023',
  },
  {
    id: '2',
    description: 'Aluguel da Loja - Julho',
    dueDate: '2023-07-05',
    amount: 2500.00,
    type: 'PAYABLE',
    category: 'Aluguel',
    status: 'PENDING',
    paymentMethod: 'Débito Automático',
    notes: '',
  },
  {
    id: '3',
    description: 'Recebimento Venda #1085 - Maria Oliveira',
    dueDate: '2023-06-15',
    amount: 354.90,
    type: 'RECEIVABLE', // A receber
    category: 'Vendas',
    status: 'RECEIVED',
    paymentMethod: 'Cartão de Crédito',
    notes: '2ª parcela de 3',
  },
  {
    id: '4',
    description: 'Conta de Energia - Junho',
    dueDate: '2023-06-20',
    amount: 345.67,
    type: 'PAYABLE',
    category: 'Utilidades',
    status: 'PENDING',
    paymentMethod: 'Boleto',
    notes: '',
  },
  {
    id: '5',
    description: 'Recebimento Venda #1088 - João Paulo',
    dueDate: '2023-07-10',
    amount: 1200.00,
    type: 'RECEIVABLE',
    category: 'Vendas',
    status: 'PENDING',
    paymentMethod: 'Transferência',
    notes: 'Cliente confirmou pagamento para o dia',
  },
  {
    id: '6',
    description: 'Pagamento Fornecedor - Distribuidora Norte',
    dueDate: '2023-06-18',
    amount: 759.35,
    type: 'PAYABLE',
    category: 'Fornecedores',
    status: 'PAID',
    paymentMethod: 'PIX',
    notes: 'Pagamento antecipado com 5% desconto',
  },
  {
    id: '7',
    description: 'Recebimento Venda #1090 - Fernanda Silva',
    dueDate: '2023-06-30',
    amount: 520.15,
    type: 'RECEIVABLE',
    category: 'Vendas',
    status: 'PENDING',
    paymentMethod: 'Boleto',
    notes: '',
  },
  {
    id: '8',
    description: 'Salários - Junho',
    dueDate: '2023-07-05',
    amount: 4500.00,
    type: 'PAYABLE',
    category: 'Salários',
    status: 'PENDING',
    paymentMethod: 'Transferência Bancária',
    notes: 'Folha de pagamento dos funcionários',
  },
]

// Status de contas e legendas
const accountStatusLabels: Record<string, string> = {
  PENDING: 'Pendente',
  PAID: 'Pago',
  RECEIVED: 'Recebido',
  OVERDUE: 'Atrasado',
  CANCELED: 'Cancelado',
}

// Tipos de contas
const accountTypes = [
  { id: 'ALL', name: 'Todas' },
  { id: 'PAYABLE', name: 'A Pagar' },
  { id: 'RECEIVABLE', name: 'A Receber' },
]

// Status de contas para filtro
const accountStatuses = [
  { id: 'ALL', name: 'Todos' },
  { id: 'PENDING', name: 'Pendentes' },
  { id: 'PAID', name: 'Pagas' },
  { id: 'RECEIVED', name: 'Recebidas' },
  { id: 'OVERDUE', name: 'Atrasadas' },
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
    case 'RECEIVED':
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

export default function AccountsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('ALL')
  const [selectedStatus, setSelectedStatus] = useState('ALL')
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
    
    let matchesType = true
    if (selectedType !== 'ALL') {
      matchesType = account.type === selectedType
    }

    let matchesStatus = true
    if (selectedStatus !== 'ALL') {
      matchesStatus = account.status === selectedStatus
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
    
    return matchesSearch && matchesType && matchesStatus && matchesPeriod
  })

  // Calcular totais
  const totalPayable = filteredAccounts
    .filter(account => account.type === 'PAYABLE' && (account.status === 'PENDING' || account.status === 'OVERDUE'))
    .reduce((sum, account) => sum + account.amount, 0)

  const totalReceivable = filteredAccounts
    .filter(account => account.type === 'RECEIVABLE' && (account.status === 'PENDING' || account.status === 'OVERDUE'))
    .reduce((sum, account) => sum + account.amount, 0)

  const totalOverdue = filteredAccounts
    .filter(account => account.status === 'OVERDUE')
    .reduce((sum, account) => sum + account.amount, 0)

  return (
    <div className="p-6 space-y-6 dark:bg-gray-900">
      <div className="flex items-center mb-6">
        <Link 
          href="/dashboard/financeiro" 
          className="flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <ArrowLeft size={16} className="mr-1" /> Voltar para Financeiro
        </Link>
      </div>
      
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold dark:text-white">Contas a Pagar e Receber</h1>
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
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total a Pagar</h3>
          <p className="text-xl font-bold text-red-600 dark:text-red-400 mt-1">{formatCurrency(totalPayable)}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total a Receber</h3>
          <p className="text-xl font-bold text-green-600 dark:text-green-400 mt-1">{formatCurrency(totalReceivable)}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Vencido</h3>
          <p className="text-xl font-bold text-amber-600 dark:text-amber-400 mt-1">{formatCurrency(totalOverdue)}</p>
        </div>
      </div>

      {/* Filtros e busca */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar contas..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-400" />
            <select
              className="block w-full py-2 pl-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {accountTypes.map((type) => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-gray-400" />
            <select
              className="block w-full py-2 pl-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
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
              className="block w-full py-2 pl-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Descrição
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Vencimento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Método
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredAccounts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    Nenhuma conta encontrada com os filtros selecionados
                  </td>
                </tr>
              ) : (
                filteredAccounts.map((account) => (
                  <tr key={account.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className={`mr-2 p-1 rounded-full ${
                          account.type === 'PAYABLE' ? 'bg-red-100 dark:bg-red-900/30' : 'bg-green-100 dark:bg-green-900/30'
                        }`}>
                          <DollarSign 
                            size={14} 
                            className={account.type === 'PAYABLE' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'} 
                          />
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {account.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Calendar size={14} className="mr-1" />
                        {formatDate(account.dueDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{account.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${
                        account.type === 'PAYABLE' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
                      }`}>
                        {formatCurrency(account.amount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(account.status)}
                        <span className={`ml-1 text-sm ${
                          account.status === 'PENDING' ? 'text-yellow-600 dark:text-yellow-400' :
                          account.status === 'PAID' || account.status === 'RECEIVED' ? 'text-green-600 dark:text-green-400' :
                          account.status === 'OVERDUE' ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {accountStatusLabels[account.status]}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{account.paymentMethod}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-3"
                        title="Editar"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                        title="Excluir"
                      >
                        <Trash size={16} />
                      </button>
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
              <h2 className="text-xl font-bold">Adicionar Nova Conta</h2>
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
              <p>Interface de adição de contas (simulada)</p>
              <p className="mt-2">Em uma implementação real, aqui seria exibido um formulário para adicionar novas contas a pagar ou receber.</p>
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
                Salvar Conta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 