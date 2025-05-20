"use client"

import { useState } from 'react'
import { ArrowLeft, Calendar, Filter, Search, Download, ArrowDown, ArrowUp, ChevronRight, ChevronDown } from 'lucide-react'
import Link from 'next/link'

// Dados simulados de fluxo de caixa diário
const mockCashFlow = [
  {
    date: '2023-06-15',
    openingBalance: 3450.75,
    closingBalance: 3850.15,
    transactions: [
      {
        id: '1001',
        time: '09:32',
        description: 'Venda #1085 - Fernanda Lima',
        amount: 159.90,
        type: 'INCOME',
        method: 'Dinheiro',
      },
      {
        id: '1002',
        time: '11:45',
        description: 'Sangria de Caixa',
        amount: 300.00,
        type: 'EXPENSE',
        method: 'Dinheiro',
      },
      {
        id: '1003',
        time: '14:23',
        description: 'Venda #1086 - Carlos Santos',
        amount: 89.90,
        type: 'INCOME',
        method: 'Cartão de Débito',
      },
      {
        id: '1004',
        time: '16:12',
        description: 'Pagamento Entregador',
        amount: 50.00,
        type: 'EXPENSE',
        method: 'Dinheiro',
      },
      {
        id: '1005',
        time: '18:05',
        description: 'Venda #1087 - Patrícia Oliveira',
        amount: 499.60,
        type: 'INCOME',
        method: 'Cartão de Crédito',
      },
    ]
  },
  {
    date: '2023-06-14',
    openingBalance: 3125.45,
    closingBalance: 3450.75,
    transactions: [
      {
        id: '1006',
        time: '10:15',
        description: 'Venda #1080 - Roberto Alves',
        amount: 245.30,
        type: 'INCOME',
        method: 'PIX',
      },
      {
        id: '1007',
        time: '12:30',
        description: 'Compra de Material de Escritório',
        amount: 75.50,
        type: 'EXPENSE',
        method: 'Cartão de Débito',
      },
      {
        id: '1008',
        time: '15:45',
        description: 'Venda #1081 - Sandra Lima',
        amount: 155.50,
        type: 'INCOME',
        method: 'Dinheiro',
      },
    ]
  },
  {
    date: '2023-06-13',
    openingBalance: 2890.20,
    closingBalance: 3125.45,
    transactions: [
      {
        id: '1009',
        time: '09:45',
        description: 'Venda #1078 - Marcos Silva',
        amount: 320.75,
        type: 'INCOME',
        method: 'Cartão de Crédito',
      },
      {
        id: '1010',
        time: '13:15',
        description: 'Manutenção do Sistema',
        amount: 150.00,
        type: 'EXPENSE',
        method: 'Transferência',
      },
      {
        id: '1011',
        time: '17:20',
        description: 'Venda #1079 - Juliana Costa',
        amount: 64.50,
        type: 'INCOME',
        method: 'PIX',
      },
    ]
  },
]

// Funções utilitárias
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR')
}

const formatCurrency = (value: number) => {
  return `R$ ${value.toFixed(2)}`
}

const getDayTotal = (transactions: any[]) => {
  return transactions.reduce((total, transaction) => {
    return total + (transaction.type === 'INCOME' ? transaction.amount : -transaction.amount)
  }, 0)
}

export default function CashFlowPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>({
    [mockCashFlow[0].date]: true
  })

  // Função para alternar a expansão dos dias
  const toggleDayExpand = (date: string) => {
    setExpandedDays(prev => ({
      ...prev,
      [date]: !prev[date]
    }))
  }

  // Filtrar pelo termo de busca
  const filteredCashFlow = mockCashFlow.filter(day => {
    if (selectedDate && day.date !== selectedDate) return false
    
    // Se não estiver buscando nada, mostrar o dia
    if (!searchTerm) return true
    
    // Verificar se alguma transação corresponde à busca
    return day.transactions.some(transaction => 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.method.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center mb-6">
        <Link 
          href="/dashboard/financeiro" 
          className="flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} className="mr-1" /> Voltar para Financeiro
        </Link>
      </div>
      
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Fluxo de Caixa Diário</h1>
        <div className="flex space-x-2">
          <button className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md">
            <Download size={16} />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      {/* Filtros e busca */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 bg-white p-4 rounded-lg shadow">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar transações..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Calendar size={18} className="text-gray-400" />
          <input
            type="date"
            className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        {selectedDate && (
          <button 
            onClick={() => setSelectedDate('')}
            className="py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md"
          >
            Limpar Filtro
          </button>
        )}
      </div>

      {/* Lista de dias com fluxo de caixa */}
      <div className="space-y-4">
        {filteredCashFlow.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
            Nenhum registro de fluxo de caixa encontrado para o período selecionado.
          </div>
        ) : (
          filteredCashFlow.map((day) => (
            <div key={day.date} className="bg-white rounded-lg shadow overflow-hidden">
              {/* Cabeçalho do dia */}
              <div 
                className="p-4 border-b flex justify-between items-center cursor-pointer hover:bg-gray-50"
                onClick={() => toggleDayExpand(day.date)}
              >
                <div className="flex items-center">
                  {expandedDays[day.date] ? (
                    <ChevronDown size={20} className="text-gray-500 mr-2" />
                  ) : (
                    <ChevronRight size={20} className="text-gray-500 mr-2" />
                  )}
                  <div>
                    <h2 className="text-lg font-medium">{formatDate(day.date)}</h2>
                    <p className="text-sm text-gray-500">
                      {day.transactions.length} transações
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Movimento do dia:</div>
                  <div className={`font-medium ${getDayTotal(day.transactions) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {getDayTotal(day.transactions) >= 0 ? '+' : ''}{formatCurrency(getDayTotal(day.transactions))}
                  </div>
                </div>
              </div>

              {/* Detalhes do fluxo de caixa do dia */}
              {expandedDays[day.date] && (
                <div>
                  {/* Saldos */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50">
                    <div>
                      <span className="text-sm text-gray-500">Saldo Inicial:</span>
                      <div className="font-medium">{formatCurrency(day.openingBalance)}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-500">Saldo Final:</span>
                      <div className="font-medium">{formatCurrency(day.closingBalance)}</div>
                    </div>
                  </div>

                  {/* Lista de transações */}
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Hora
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Descrição
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Método
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Valor
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {day.transactions.map((transaction) => (
                          <tr key={transaction.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{transaction.time}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{transaction.method}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <div className={`text-sm font-medium ${
                                transaction.type === 'INCOME' ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {transaction.type === 'INCOME' ? '+' : '-'} {formatCurrency(transaction.amount)}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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