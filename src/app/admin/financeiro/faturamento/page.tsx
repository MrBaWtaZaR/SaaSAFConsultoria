"use client"

import { useState } from 'react'
import { ArrowLeft, Calendar, Filter, Search, Download, FileText, ChevronDown, ChevronRight, CreditCard, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import Link from 'next/link'

// Dados simulados de assinaturas e faturamento
const mockInvoices = [
  {
    id: '1',
    clientName: 'Loja Moda Atual',
    planName: 'Básico',
    planPrice: 89.90,
    invoiceDate: '2023-06-10',
    dueDate: '2023-06-15',
    status: 'PAID',
    paymentMethod: 'Cartão de Crédito',
    invoiceNumber: 'INV-2023-0045',
  },
  {
    id: '2',
    clientName: 'Boutique Elegance',
    planName: 'Premium',
    planPrice: 149.90,
    invoiceDate: '2023-06-08',
    dueDate: '2023-06-13',
    status: 'PAID',
    paymentMethod: 'PIX',
    invoiceNumber: 'INV-2023-0044',
  },
  {
    id: '3',
    clientName: 'ModaFit Store',
    planName: 'Premium',
    planPrice: 149.90,
    invoiceDate: '2023-06-05',
    dueDate: '2023-06-10',
    status: 'PAID',
    paymentMethod: 'Boleto',
    invoiceNumber: 'INV-2023-0043',
  },
  {
    id: '4',
    clientName: 'Roupas & Estilo',
    planName: 'Básico',
    planPrice: 89.90,
    invoiceDate: '2023-06-01',
    dueDate: '2023-06-06',
    status: 'PAID',
    paymentMethod: 'Cartão de Débito',
    invoiceNumber: 'INV-2023-0042',
  },
  {
    id: '5',
    clientName: 'Fashion Trends',
    planName: 'Enterprise',
    planPrice: 249.90,
    invoiceDate: '2023-06-15',
    dueDate: '2023-06-20',
    status: 'PENDING',
    paymentMethod: 'Cartão de Crédito',
    invoiceNumber: 'INV-2023-0046',
  },
  {
    id: '6',
    clientName: 'Moda Urbana',
    planName: 'Básico',
    planPrice: 89.90,
    invoiceDate: '2023-06-14',
    dueDate: '2023-06-19',
    status: 'PENDING',
    paymentMethod: 'Boleto',
    invoiceNumber: 'INV-2023-0047',
  },
  {
    id: '7',
    clientName: 'Elite Fashion',
    planName: 'Enterprise',
    planPrice: 249.90,
    invoiceDate: '2023-05-30',
    dueDate: '2023-06-04',
    status: 'OVERDUE',
    paymentMethod: 'Boleto',
    invoiceNumber: 'INV-2023-0041',
  },
  {
    id: '8',
    clientName: 'Style Shop',
    planName: 'Premium',
    planPrice: 149.90,
    invoiceDate: '2023-05-25',
    dueDate: '2023-05-30',
    status: 'PAID',
    paymentMethod: 'Transferência',
    invoiceNumber: 'INV-2023-0040',
  },
]

// Planos e preços
const subscriptionPlans = [
  { id: 'basic', name: 'Básico', price: 89.90 },
  { id: 'premium', name: 'Premium', price: 149.90 },
  { id: 'enterprise', name: 'Enterprise', price: 249.90 },
]

// Status de faturas
const invoiceStatuses: Record<string, string> = {
  PAID: 'Paga',
  PENDING: 'Pendente',
  OVERDUE: 'Atrasada',
  CANCELED: 'Cancelada',
}

// Status para filtro
const statusOptions = [
  { id: 'ALL', name: 'Todas' },
  { id: 'PAID', name: 'Pagas' },
  { id: 'PENDING', name: 'Pendentes' },
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
    case 'PAID':
      return <CheckCircle size={16} className="text-green-500" />
    case 'PENDING':
      return <Clock size={16} className="text-yellow-500" />
    case 'OVERDUE':
      return <AlertCircle size={16} className="text-red-500" />
    default:
      return null
  }
}

// Verificar se uma fatura está vencida
const isOverdue = (dueDate: string, status: string) => {
  if (status !== 'PENDING') return false
  const today = new Date()
  const due = new Date(dueDate)
  return due < today
}

// Atualizar status de faturas vencidas
const updateInvoiceStatuses = (invoices: any[]) => {
  return invoices.map(invoice => {
    if (isOverdue(invoice.dueDate, invoice.status)) {
      return { ...invoice, status: 'OVERDUE' }
    }
    return invoice
  })
}

// Calcular métricas financeiras
const calculateMetrics = (invoices: any[]) => {
  const totalPaid = invoices
    .filter(invoice => invoice.status === 'PAID')
    .reduce((sum, invoice) => sum + invoice.planPrice, 0)

  const totalPending = invoices
    .filter(invoice => invoice.status === 'PENDING')
    .reduce((sum, invoice) => sum + invoice.planPrice, 0)

  const totalOverdue = invoices
    .filter(invoice => invoice.status === 'OVERDUE')
    .reduce((sum, invoice) => sum + invoice.planPrice, 0)

  const monthlyRecurring = subscriptionPlans.reduce((sum, plan) => {
    const clientsOnPlan = invoices.filter(invoice => 
      invoice.planName === plan.name && ['PAID', 'PENDING'].includes(invoice.status)
    ).length
    return sum + (plan.price * clientsOnPlan)
  }, 0)

  return {
    totalPaid,
    totalPending,
    totalOverdue,
    monthlyRecurring
  }
}

export default function AdminFaturamentoPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('ALL')
  const [selectedMonth, setSelectedMonth] = useState('')
  const [expandedInvoice, setExpandedInvoice] = useState<string | null>(null)
  
  // Atualizar status de faturas vencidas
  const updatedInvoices = updateInvoiceStatuses(mockInvoices)
  
  // Filtrar faturas
  const filteredInvoices = updatedInvoices.filter(invoice => {
    const matchesSearch = 
      invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.planName.toLowerCase().includes(searchTerm.toLowerCase())
    
    let matchesStatus = true
    if (selectedStatus !== 'ALL') {
      matchesStatus = invoice.status === selectedStatus
    }
    
    let matchesMonth = true
    if (selectedMonth) {
      const invoiceDate = new Date(invoice.invoiceDate)
      const [year, month] = selectedMonth.split('-')
      matchesMonth = 
        invoiceDate.getFullYear() === parseInt(year) && 
        invoiceDate.getMonth() === parseInt(month) - 1
    }
    
    return matchesSearch && matchesStatus && matchesMonth
  })
  
  // Calcular métricas
  const metrics = calculateMetrics(updatedInvoices)
  
  // Alternar expansão da fatura
  const toggleInvoiceExpand = (id: string) => {
    if (expandedInvoice === id) {
      setExpandedInvoice(null)
    } else {
      setExpandedInvoice(id)
    }
  }
  
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
        <h1 className="text-2xl font-bold">Faturamento</h1>
        <button className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md">
          <Download size={16} />
          <span>Exportar Relatório</span>
        </button>
      </div>
      
      {/* Cartões de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Receita Mensal Recorrente</h3>
          <p className="text-xl font-bold text-primary mt-1">{formatCurrency(metrics.monthlyRecurring)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Faturas Pagas (Mês)</h3>
          <p className="text-xl font-bold text-green-600 mt-1">{formatCurrency(metrics.totalPaid)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Faturas Pendentes</h3>
          <p className="text-xl font-bold text-yellow-600 mt-1">{formatCurrency(metrics.totalPending)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Faturas Atrasadas</h3>
          <p className="text-xl font-bold text-red-600 mt-1">{formatCurrency(metrics.totalOverdue)}</p>
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
              placeholder="Buscar por cliente ou fatura..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-400" />
            <select
              className="block w-full py-2 pl-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statusOptions.map((status) => (
                <option key={status.id} value={status.id}>{status.name}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-gray-400" />
            <input
              type="month"
              className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            />
          </div>
          
          {selectedMonth && (
            <button 
              onClick={() => setSelectedMonth('')}
              className="py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md"
            >
              Limpar Mês
            </button>
          )}
        </div>
      </div>
      
      {/* Lista de faturas */}
      <div className="space-y-4">
        {filteredInvoices.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
            Nenhuma fatura encontrada com os filtros selecionados.
          </div>
        ) : (
          filteredInvoices.map((invoice) => (
            <div key={invoice.id} className="bg-white rounded-lg shadow overflow-hidden">
              {/* Cabeçalho da fatura */}
              <div 
                className="p-4 border-b flex justify-between items-center cursor-pointer hover:bg-gray-50"
                onClick={() => toggleInvoiceExpand(invoice.id)}
              >
                <div className="flex items-center">
                  {expandedInvoice === invoice.id ? (
                    <ChevronDown size={20} className="text-gray-500 mr-2" />
                  ) : (
                    <ChevronRight size={20} className="text-gray-500 mr-2" />
                  )}
                  <div>
                    <h2 className="text-lg font-medium">Fatura {invoice.invoiceNumber}</h2>
                    <p className="text-sm text-gray-500">
                      {invoice.clientName} • {invoice.planName}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center">
                    {getStatusIcon(invoice.status)}
                    <span className={`ml-1 ${
                      invoice.status === 'PAID' ? 'text-green-600' :
                      invoice.status === 'PENDING' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {invoiceStatuses[invoice.status]}
                    </span>
                  </div>
                  <div className="text-primary font-medium">
                    {formatCurrency(invoice.planPrice)}
                  </div>
                </div>
              </div>
              
              {/* Detalhes da fatura */}
              {expandedInvoice === invoice.id && (
                <div className="p-4 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Detalhes da Fatura</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Número da Fatura:</span>
                          <span className="text-sm font-medium">{invoice.invoiceNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Data de Emissão:</span>
                          <span className="text-sm">{formatDate(invoice.invoiceDate)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Data de Vencimento:</span>
                          <span className="text-sm">{formatDate(invoice.dueDate)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Método de Pagamento:</span>
                          <span className="text-sm">{invoice.paymentMethod}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Detalhes do Plano</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Plano:</span>
                          <span className="text-sm font-medium">{invoice.planName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Valor Mensal:</span>
                          <span className="text-sm">{formatCurrency(invoice.planPrice)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Cliente:</span>
                          <span className="text-sm">{invoice.clientName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Status:</span>
                          <span className={`text-sm ${
                            invoice.status === 'PAID' ? 'text-green-600' :
                            invoice.status === 'PENDING' ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {invoiceStatuses[invoice.status]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <button className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md mr-2">
                      <CreditCard size={16} />
                      <span>Registrar Pagamento</span>
                    </button>
                    <button className="flex items-center gap-1 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md">
                      <FileText size={16} />
                      <span>Ver Detalhes</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
} 