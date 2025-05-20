"use client"

import { useState } from 'react'
import { DollarSign, CreditCard, TrendingUp, ArrowDownCircle, Calendar, Filter, Search, Download, ArrowDown, ArrowUp, Percent, PieChart, BarChart2, ListFilter, FileText } from 'lucide-react'
import Link from 'next/link'

// Dados simulados de transações financeiras
const mockTransactions = [
  {
    id: '1',
    description: 'Venda #1084 - Maria Oliveira',
    date: '2023-06-10',
    amount: 354.90,
    type: 'INCOME',
    method: 'Cartão de Crédito',
    installments: 3,
    status: 'COMPLETED',
  },
  {
    id: '2',
    description: 'Venda #1083 - João Silva',
    date: '2023-06-08',
    amount: 897.00,
    type: 'INCOME',
    method: 'PIX',
    installments: 1,
    status: 'COMPLETED',
  },
  {
    id: '3',
    description: 'Pagamento de Fornecedor - Têxtil Brasil',
    date: '2023-06-05',
    amount: 1250.00,
    type: 'EXPENSE',
    method: 'Transferência',
    installments: 1,
    status: 'COMPLETED',
  },
  {
    id: '4',
    description: 'Venda #1082 - Ana Santos',
    date: '2023-06-03',
    amount: 1254.50,
    type: 'INCOME',
    method: 'Dinheiro',
    installments: 1,
    status: 'COMPLETED',
  },
  {
    id: '5',
    description: 'Aluguel da Loja - Junho',
    date: '2023-06-01',
    amount: 2500.00,
    type: 'EXPENSE',
    method: 'Débito Automático',
    installments: 1,
    status: 'COMPLETED',
  },
  {
    id: '6',
    description: 'Venda #1081 - Pedro Souza',
    date: '2023-05-30',
    amount: 456.20,
    type: 'INCOME',
    method: 'Cartão de Débito',
    installments: 1,
    status: 'COMPLETED',
  },
  {
    id: '7',
    description: 'Conta de Luz - Maio',
    date: '2023-05-25',
    amount: 345.67,
    type: 'EXPENSE',
    method: 'Débito Automático',
    installments: 1,
    status: 'COMPLETED',
  },
]

// Dados simulados para o resumo financeiro
const financialSummary = {
  currentMonth: {
    revenue: 8675.40,
    expenses: 4095.67,
    profit: 4579.73,
    profitMargin: 52.8,
  },
  previousMonth: {
    revenue: 7940.15,
    expenses: 3876.22,
    profit: 4063.93,
    profitMargin: 51.2,
  },
}

// Dados de métodos de pagamento recebidos
const paymentMethodsData = [
  { method: 'Cartão de Crédito', percentage: 45, amount: 3903.93 },
  { method: 'PIX', percentage: 25, amount: 2168.85 },
  { method: 'Dinheiro', percentage: 18, amount: 1561.57 },
  { method: 'Cartão de Débito', percentage: 12, amount: 1041.05 },
]

// Dados mensais para o gráfico (simulados)
const monthlyData = [
  { month: 'Jan', revenue: 6720.50, expenses: 3500.25 },
  { month: 'Fev', revenue: 7150.30, expenses: 3650.80 },
  { month: 'Mar', revenue: 6890.45, expenses: 3420.10 },
  { month: 'Abr', revenue: 7458.25, expenses: 3680.40 },
  { month: 'Mai', revenue: 7940.15, expenses: 3876.22 },
  { month: 'Jun', revenue: 8675.40, expenses: 4095.67 },
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

export default function FinancePage() {
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

  // Filtrar transações
  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.method.toLowerCase().includes(searchTerm.toLowerCase())
    
    let matchesType = true
    if (selectedType !== 'ALL') {
      matchesType = transaction.type === selectedType
    }
    
    return matchesSearch && matchesType
  })

  return (
    <div className="p-6 space-y-6 dark:bg-gray-900">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold dark:text-white">Financeiro</h1>
        <div className="flex space-x-2">
          <Link 
            href="/dashboard/financeiro/contas"
            className="flex items-center gap-1 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md"
          >
            <FileText size={16} />
            <span>Contas a Pagar/Receber</span>
          </Link>
          <Link 
            href="/dashboard/financeiro/fluxo-caixa"
            className="flex items-center gap-1 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md"
          >
            <ListFilter size={16} />
            <span>Fluxo de Caixa</span>
          </Link>
          <button className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
            <Download size={16} />
            <span>Exportar Relatório</span>
          </button>
        </div>
      </div>

      {/* Resumo Financeiro Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Receita */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Receita (Mês Atual)</h2>
              <p className="text-2xl font-bold mt-1 text-green-600 dark:text-green-500">{formatCurrency(financialSummary.currentMonth.revenue)}</p>
            </div>
            <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30">
              <DollarSign size={20} className="text-green-600 dark:text-green-500" />
            </div>
          </div>
          <div className={`mt-4 text-sm ${revenueChange >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'} flex items-center`}>
            {revenueChange >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            <span className="ml-1">{Math.abs(revenueChange).toFixed(1)}% desde o mês anterior</span>
          </div>
        </div>

        {/* Despesas */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Despesas (Mês Atual)</h2>
              <p className="text-2xl font-bold mt-1 text-red-600 dark:text-red-500">{formatCurrency(financialSummary.currentMonth.expenses)}</p>
            </div>
            <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30">
              <ArrowDownCircle size={20} className="text-red-600 dark:text-red-500" />
            </div>
          </div>
          <div className={`mt-4 text-sm ${expensesChange <= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'} flex items-center`}>
            {expensesChange <= 0 ? <ArrowDown size={16} /> : <ArrowUp size={16} />}
            <span className="ml-1">{Math.abs(expensesChange).toFixed(1)}% desde o mês anterior</span>
          </div>
        </div>

        {/* Lucro */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Lucro (Mês Atual)</h2>
              <p className="text-2xl font-bold mt-1 text-primary">{formatCurrency(financialSummary.currentMonth.profit)}</p>
            </div>
            <div className="p-2 rounded-full bg-primary/10">
              <TrendingUp size={20} className="text-primary" />
            </div>
          </div>
          <div className={`mt-4 text-sm ${profitChange >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'} flex items-center`}>
            {profitChange >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            <span className="ml-1">{Math.abs(profitChange).toFixed(1)}% desde o mês anterior</span>
          </div>
        </div>

        {/* Margem */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Margem de Lucro</h2>
              <p className="text-2xl font-bold mt-1 text-primary">{financialSummary.currentMonth.profitMargin.toFixed(1)}%</p>
            </div>
            <div className="p-2 rounded-full bg-primary/10">
              <Percent size={20} className="text-primary" />
            </div>
          </div>
          <div className={`mt-4 text-sm ${marginChange >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'} flex items-center`}>
            {marginChange >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            <span className="ml-1">{Math.abs(marginChange).toFixed(1)}% desde o mês anterior</span>
          </div>
        </div>
      </div>

      {/* Filtros e busca */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar transação..."
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
            {transactionTypes.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-gray-400" />
          <select
            className="block w-full py-2 pl-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
            value={currentPeriod}
            onChange={(e) => setCurrentPeriod(e.target.value)}
          >
            <option value="week">Esta Semana</option>
            <option value="month">Este Mês</option>
            <option value="quarter">Este Trimestre</option>
            <option value="year">Este Ano</option>
          </select>
        </div>
      </div>

      {/* Lista de transações */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Descrição
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Método
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    Nenhuma transação encontrada
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{transaction.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{formatDate(transaction.date)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${transaction.type === 'INCOME' ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                        {transaction.type === 'INCOME' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        transaction.type === 'INCOME' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {transaction.type === 'INCOME' ? 'Receita' : 'Despesa'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-200">{transaction.method}</div>
                      {transaction.installments > 1 && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Em {transaction.installments}x
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        transaction.status === 'COMPLETED' 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                          : transaction.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                      }`}>
                        {transactionStatusLabels[transaction.status]}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 