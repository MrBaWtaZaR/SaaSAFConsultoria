"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Eye, Search, Filter, Calendar } from 'lucide-react'

// Dados simulados de vendas
const mockSales = [
  {
    id: '1',
    client: {
      id: '1',
      name: 'Maria Oliveira',
    },
    date: '2023-05-15',
    total: 354.90,
    items: 3,
    paymentMethod: 'Cartão de Crédito',
    status: 'COMPLETED',
  },
  {
    id: '2',
    client: {
      id: '2',
      name: 'João Silva',
    },
    date: '2023-05-14',
    total: 897.00,
    items: 5,
    paymentMethod: 'PIX',
    status: 'COMPLETED',
  },
  {
    id: '3',
    client: {
      id: '3',
      name: 'Ana Santos',
    },
    date: '2023-05-12',
    total: 1254.50,
    items: 8,
    paymentMethod: 'Dinheiro',
    status: 'COMPLETED',
  },
  {
    id: '4',
    client: {
      id: '4',
      name: 'Carlos Ferreira',
    },
    date: '2023-05-10',
    total: 456.20,
    items: 2,
    paymentMethod: 'Cartão de Débito',
    status: 'COMPLETED',
  },
  {
    id: '5',
    client: null, // Cliente não cadastrado
    date: '2023-05-08',
    total: 125.80,
    items: 1,
    paymentMethod: 'Dinheiro',
    status: 'COMPLETED',
  },
  {
    id: '6',
    client: {
      id: '5',
      name: 'Sandra Lima',
    },
    date: '2023-05-05',
    total: 789.30,
    items: 4,
    paymentMethod: 'PIX',
    status: 'PENDING',
  },
]

// Tradução dos status de venda para exibição
const saleStatusLabels: Record<string, string> = {
  COMPLETED: 'Concluída',
  PENDING: 'Pendente',
  CANCELED: 'Cancelada'
}

// Formatar data para exibição
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR')
}

export default function SalesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('Todos')
  
  // Status de venda disponíveis
  const saleStatuses = ['Todos', 'Concluída', 'Pendente', 'Cancelada']

  // Filtrar vendas com base no termo de busca e status
  const filteredSales = mockSales.filter(sale => {
    const clientName = sale.client ? sale.client.name.toLowerCase() : ''
    const matchesSearch = 
      clientName.includes(searchTerm.toLowerCase()) ||
      sale.id.includes(searchTerm) ||
      sale.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())
    
    let matchesStatus = true
    if (selectedStatus !== 'Todos') {
      const statusKey = Object.keys(saleStatusLabels).find(
        key => saleStatusLabels[key] === selectedStatus
      )
      matchesStatus = sale.status === statusKey
    }
    
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-6 space-y-6 dark:bg-gray-900">
      <div className="flex justify-between items-center">
        <h1 className="text-title">Vendas</h1>
        <Link 
          href="/dashboard/vendas/nova" 
          className="flex items-center gap-1 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md"
        >
          <Plus size={18} />
          <span>Nova Venda</span>
        </Link>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400 dark:text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Buscar vendas..."
            className="input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter size={18} className="text-gray-400 dark:text-gray-500" />
          <select
            className="select"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {saleStatuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Sales list */}
      <div className="table-container">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="table-header">
              <tr>
                <th scope="col">
                  Código
                </th>
                <th scope="col">
                  Cliente
                </th>
                <th scope="col">
                  Data
                </th>
                <th scope="col">
                  Valor
                </th>
                <th scope="col">
                  Forma de Pagamento
                </th>
                <th scope="col">
                  Status
                </th>
                <th scope="col" className="text-right">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="table-body">
              {filteredSales.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    Nenhuma venda encontrada
                  </td>
                </tr>
              ) : (
                filteredSales.map((sale) => (
                  <tr key={sale.id} className="table-row">
                    <td className="table-cell font-medium">
                      #{sale.id}
                    </td>
                    <td className="table-cell">
                      {sale.client ? sale.client.name : 'Cliente não cadastrado'}
                    </td>
                    <td className="table-cell-light">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1 dark:text-gray-400" />
                        {formatDate(sale.date)}
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="font-medium">
                        R$ {sale.total.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {sale.items} {sale.items === 1 ? 'item' : 'itens'}
                      </div>
                    </td>
                    <td className="table-cell">
                      {sale.paymentMethod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${sale.status === 'COMPLETED' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 
                          sale.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' : 
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}
                      >
                        {saleStatusLabels[sale.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link href={`/dashboard/vendas/${sale.id}`} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                          <Eye size={18} />
                        </Link>
                        {sale.status !== 'COMPLETED' && (
                          <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                            <Edit size={18} />
                          </button>
                        )}
                      </div>
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