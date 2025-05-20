"use client"

import { useState } from 'react'
import { DollarSign, TrendingUp, ArrowDownCircle, Calendar, Filter, Search, Download, ArrowDown, ArrowUp, Percent, PieChart, BarChart2, ListFilter, FileText } from 'lucide-react'
import Link from 'next/link'

// Dados simulados de transações financeiras (dados administrativos)
const mockTransactions = [
  {
    id: '1',
    description: 'Pagamento de Assinatura - Plano Básico',
    date: '2023-06-10',
    amount: 89.90,
    type: 'INCOME',
    client: 'Loja Moda Atual',
    method: 'Cartão de Crédito',
    status: 'COMPLETED',
  },
  {
    id: '2',
    description: 'Pagamento de Assinatura - Plano Premium',
    date: '2023-06-08',
    amount: 149.90,
    type: 'INCOME',
    client: 'Boutique Elegance',
    method: 'PIX',
    status: 'COMPLETED',
  },
  {
    id: '3',
    description: 'Pagamento Servidor AWS',
    date: '2023-06-05',
    amount: 450.00,
    type: 'EXPENSE',
    client: null,
    method: 'Cartão Corporativo',
    status: 'COMPLETED',
  },
  {
    id: '4',
    description: 'Pagamento de Assinatura - Plano Premium',
    date: '2023-06-03',
    amount: 149.90,
    type: 'INCOME',
    client: 'ModaFit Store',
    method: 'Boleto',
    status: 'COMPLETED',
  },
  {
    id: '5',
    description: 'Salários Equipe de Desenvolvimento',
    date: '2023-06-01',
    amount: 7500.00,
    type: 'EXPENSE',
    client: null,
    method: 'Transferência',
    status: 'COMPLETED',
  },
  {
    id: '6',
    description: 'Pagamento de Assinatura - Plano Básico',
    date: '2023-05-30',
    amount: 89.90,
    type: 'INCOME',
    client: 'Roupas & Estilo',
    method: 'Cartão de Débito',
    status: 'COMPLETED',
  },
  {
    id: '7',
    description: 'Licenças de Software',
    date: '2023-05-25',
    amount: 350.00,
    type: 'EXPENSE',
    client: null,
    method: 'Cartão Corporativo',
    status: 'COMPLETED',
  },
]

// Dados simulados para o resumo financeiro da plataforma
const financialSummary = {
  currentMonth: {
    revenue: 8975.40,
    expenses: 8300.00,
    profit: 675.40,
    profitMargin: 7.5,
    totalClients: 47,
    newClients: 5,
  },
  previousMonth: {
    revenue: 8320.15,
    expenses: 7950.50,
    profit: 369.65,
    profitMargin: 4.4,
    totalClients: 42,
    newClients: 3,
  },
}

// Dados de planos assinados
const subscriptionPlansData = [
  { plan: 'Plano Básico (R$89,90)', percentage: 55, count: 26 },
  { plan: 'Plano Premium (R$149,90)', percentage: 30, count: 14 },
  { plan: 'Plano Enterprise (R$249,90)', percentage: 15, count: 7 },
]

// Dados mensais para o gráfico (simulados)
const monthlyData = [
  { month: 'Jan', revenue: 7500.50, expenses: 7100.25 },
  { month: 'Fev', revenue: 7750.30, expenses: 7250.80 },
  { month: 'Mar', revenue: 7890.45, expenses: 7320.10 },
  { month: 'Abr', revenue: 8100.25, expenses: 7480.40 },
  { month: 'Mai', revenue: 8320.15, expenses: 7950.50 },
  { month: 'Jun', revenue: 8975.40, expenses: 8300.00 },
]

// Status de transação e legendas
const transactionStatusLabels: Record<string, string> = {
  COMPLETED: 'Concluída',
  PENDING: 'Pendente',
  CANCELED: 'Cancelada',
}

// Tipos de transação
const transactionTypes = [
  { id: 'ALL', name: 'Todas' },
  { id: 'INCOME', name: 'Receitas' },
  { id: 'EXPENSE', name: 'Despesas' },
]

// Funções utilitárias
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR')
}

const formatCurrency = (value: number) => {
  return `R$ ${value.toFixed(2)}`
}

const getPercentageChange = (current: number, previous: number) => {
  if (previous === 0) return 0
  return ((current - previous) / previous) * 100
}

export default function AdminFinanceiroPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('ALL')
  const [currentPeriod, setCurrentPeriod] = useState('month')

  // Calcular mudanças percentuais
  const revenueChange = getPercentageChange(
    financialSummary.currentMonth.revenue,
    financialSummary.previousMonth.revenue
  )
  
  const expensesChange = getPercentageChange(
    financialSummary.currentMonth.expenses,
    financialSummary.previousMonth.expenses
  )
  
  const profitChange = getPercentageChange(
    financialSummary.currentMonth.profit,
    financialSummary.previousMonth.profit
  )
  
  const marginChange = getPercentageChange(
    financialSummary.currentMonth.profitMargin,
    financialSummary.previousMonth.profitMargin
  )

  const clientsChange = getPercentageChange(
    financialSummary.currentMonth.totalClients,
    financialSummary.previousMonth.totalClients
  )

  // Filtrar transações
  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (transaction.client && transaction.client.toLowerCase().includes(searchTerm.toLowerCase())) ||
      transaction.method.toLowerCase().includes(searchTerm.toLowerCase())
    
    let matchesType = true
    if (selectedType !== 'ALL') {
      matchesType = transaction.type === selectedType
    }
    
    return matchesSearch && matchesType
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Financeiro Administrativo</h1>
        <div className="flex space-x-2">
          <Link 
            href="/admin/financeiro/contas"
            className="flex items-center gap-1 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md"
          >
            <FileText size={16} />
            <span>Contas a Pagar</span>
          </Link>
          <Link 
            href="/admin/financeiro/faturamento"
            className="flex items-center gap-1 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md"
          >
            <ListFilter size={16} />
            <span>Faturamento</span>
          </Link>
          <button className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md">
            <Download size={16} />
            <span>Exportar Relatório</span>
          </button>
        </div>
      </div>

      {/* Resumo Financeiro Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {/* Receita */}
        <div className="lg:col-span-1 xl:col-span-1 bg-white rounded-lg shadow p-6 flex flex-col">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-sm font-medium text-gray-500">Receita (Mês Atual)</h2>
              <p className="text-2xl font-bold mt-1 text-green-600">{formatCurrency(financialSummary.currentMonth.revenue)}</p>
            </div>
            <div className="p-2 rounded-full bg-green-100">
              <DollarSign size={20} className="text-green-600" />
            </div>
          </div>
          <div className={`mt-4 text-sm ${revenueChange >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
            {revenueChange >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            <span className="ml-1">{Math.abs(revenueChange).toFixed(1)}% desde o mês anterior</span>
          </div>
        </div>

        {/* Despesas */}
        <div className="lg:col-span-1 xl:col-span-1 bg-white rounded-lg shadow p-6 flex flex-col">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-sm font-medium text-gray-500">Despesas (Mês Atual)</h2>
              <p className="text-2xl font-bold mt-1 text-red-600">{formatCurrency(financialSummary.currentMonth.expenses)}</p>
            </div>
            <div className="p-2 rounded-full bg-red-100">
              <ArrowDownCircle size={20} className="text-red-600" />
            </div>
          </div>
          <div className={`mt-4 text-sm ${expensesChange <= 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
            {expensesChange <= 0 ? <ArrowDown size={16} /> : <ArrowUp size={16} />}
            <span className="ml-1">{Math.abs(expensesChange).toFixed(1)}% desde o mês anterior</span>
          </div>
        </div>

        {/* Lucro */}
        <div className="lg:col-span-1 xl:col-span-1 bg-white rounded-lg shadow p-6 flex flex-col">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-sm font-medium text-gray-500">Lucro (Mês Atual)</h2>
              <p className="text-2xl font-bold mt-1 text-primary">{formatCurrency(financialSummary.currentMonth.profit)}</p>
            </div>
            <div className="p-2 rounded-full bg-primary/10">
              <TrendingUp size={20} className="text-primary" />
            </div>
          </div>
          <div className={`mt-4 text-sm ${profitChange >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
            {profitChange >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            <span className="ml-1">{Math.abs(profitChange).toFixed(1)}% desde o mês anterior</span>
          </div>
        </div>

        {/* Margem de Lucro */}
        <div className="lg:col-span-1 xl:col-span-1 bg-white rounded-lg shadow p-6 flex flex-col">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-sm font-medium text-gray-500">Margem de Lucro</h2>
              <p className="text-2xl font-bold mt-1 text-blue-600">{financialSummary.currentMonth.profitMargin.toFixed(1)}%</p>
            </div>
            <div className="p-2 rounded-full bg-blue-100">
              <Percent size={20} className="text-blue-600" />
            </div>
          </div>
          <div className={`mt-4 text-sm ${marginChange >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
            {marginChange >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            <span className="ml-1">{Math.abs(marginChange).toFixed(1)} pontos percentuais</span>
          </div>
        </div>

        {/* Total de Clientes */}
        <div className="lg:col-span-1 xl:col-span-1 bg-white rounded-lg shadow p-6 flex flex-col">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-sm font-medium text-gray-500">Total de Clientes</h2>
              <p className="text-2xl font-bold mt-1 text-indigo-600">{financialSummary.currentMonth.totalClients}</p>
            </div>
            <div className="p-2 rounded-full bg-indigo-100">
              <DollarSign size={20} className="text-indigo-600" />
            </div>
          </div>
          <div className={`mt-4 text-sm ${clientsChange >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
            {clientsChange >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            <span className="ml-1">{financialSummary.currentMonth.newClients} novos este mês</span>
          </div>
        </div>

        {/* Ticket Médio */}
        <div className="lg:col-span-1 xl:col-span-1 bg-white rounded-lg shadow p-6 flex flex-col">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-sm font-medium text-gray-500">Ticket Médio</h2>
              <p className="text-2xl font-bold mt-1 text-purple-600">{formatCurrency(financialSummary.currentMonth.revenue / financialSummary.currentMonth.totalClients)}</p>
            </div>
            <div className="p-2 rounded-full bg-purple-100">
              <DollarSign size={20} className="text-purple-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500 flex items-center">
            <span className="ml-1">Por cliente/mês</span>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Receitas e Despesas Mensais */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Evolução Financeira</h2>
            <div className="flex space-x-2">
              <button 
                className={`text-xs px-3 py-1 rounded-md ${currentPeriod === 'month' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setCurrentPeriod('month')}
              >
                Mensal
              </button>
              <button 
                className={`text-xs px-3 py-1 rounded-md ${currentPeriod === 'quarter' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setCurrentPeriod('quarter')}
              >
                Trimestral
              </button>
              <button 
                className={`text-xs px-3 py-1 rounded-md ${currentPeriod === 'year' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setCurrentPeriod('year')}
              >
                Anual
              </button>
            </div>
          </div>
          <div className="h-64 bg-gray-100 flex items-center justify-center rounded-md">
            <div className="flex flex-col items-center">
              <BarChart2 size={40} className="text-gray-400 mb-2" />
              <p className="text-gray-500">Gráfico de Receitas e Despesas (simulado)</p>
              <div className="flex mt-4 space-x-4">
                {monthlyData.map((month) => (
                  <div key={month.month} className="flex flex-col items-center">
                    <div className="flex flex-col h-40 space-y-1 items-center justify-end">
                      <div className="w-6 bg-green-500" style={{ height: `${(month.revenue / 10000) * 100}px` }}></div>
                      <div className="w-6 bg-red-500" style={{ height: `${(month.expenses / 10000) * 100}px` }}></div>
                    </div>
                    <span className="text-xs mt-1">{month.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Distribuição de Planos */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Distribuição de Planos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-48 bg-gray-100 flex items-center justify-center rounded-md">
              <div className="flex flex-col items-center">
                <PieChart size={40} className="text-gray-400 mb-2" />
                <p className="text-gray-500">Gráfico de Distribuição (simulado)</p>
              </div>
            </div>
            <div className="space-y-3">
              {subscriptionPlansData.map((item) => (
                <div key={item.plan} className="flex flex-col">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.plan}</span>
                    <span className="text-sm text-gray-500">{item.percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                    <div
                      className="h-2 bg-primary rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">
                    {item.count} clientes
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Transações Financeiras */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-medium">Transações Financeiras</h2>
        </div>

        {/* Filtros e busca */}
        <div className="p-4 bg-gray-50 border-b flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar transações ou clientes..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter size={18} className="text-gray-400" />
            <select
              className="block w-full py-2 pl-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {transactionTypes.map((type) => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Lista de transações */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descrição
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Método
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    Nenhuma transação encontrada
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{transaction.client || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={14} className="mr-1" />
                        {formatDate(transaction.date)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${
                        transaction.type === 'INCOME' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'INCOME' ? '+' : '-'} {formatCurrency(transaction.amount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {transaction.method}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${transaction.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 
                          transaction.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'}`}
                      >
                        {transactionStatusLabels[transaction.status]}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Opção para ver mais */}
        <div className="px-6 py-4 border-t">
          <button className="text-primary text-sm font-medium hover:underline">
            Ver mais transações
          </button>
        </div>
      </div>
    </div>
  )
} 