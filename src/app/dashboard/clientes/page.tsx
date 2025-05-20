"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash, Search, Filter } from 'lucide-react'

// Dados simulados de clientes
const mockClients = [
  {
    id: '1',
    name: 'Maria Oliveira',
    phone: '(11) 98765-4321',
    email: 'maria@email.com',
    city: 'São Paulo',
    state: 'SP',
    type: 'RETAIL',
    notes: 'Cliente frequente, prefere contato por WhatsApp',
  },
  {
    id: '2',
    name: 'João Silva',
    phone: '(21) 99876-5432',
    email: 'joao@email.com',
    city: 'Rio de Janeiro',
    state: 'RJ',
    type: 'RESELLER',
    notes: 'Revendedor, compra para loja na zona norte',
  },
  {
    id: '3',
    name: 'Ana Santos',
    phone: '(31) 98877-6655',
    email: 'ana@email.com',
    city: 'Belo Horizonte',
    state: 'MG',
    type: 'RETAIL',
    notes: '',
  },
  {
    id: '4',
    name: 'Carlos Ferreira',
    phone: '(41) 99988-7766',
    email: 'carlos@email.com',
    city: 'Curitiba',
    state: 'PR',
    type: 'EXCURSION',
    notes: 'Traz excursões mensais de Curitiba',
  },
  {
    id: '5',
    name: 'Sandra Lima',
    phone: '(85) 98765-1234',
    email: 'sandra@email.com',
    city: 'Fortaleza',
    state: 'CE',
    type: 'RESELLER',
    notes: 'Revendedora de moda praia',
  },
]

// Tradução dos tipos de cliente para exibição
const clientTypeLabels: Record<string, string> = {
  RETAIL: 'Varejo',
  RESELLER: 'Revendedor',
  EXCURSION: 'Excursão'
}

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('Todos')

  // Tipos de cliente disponíveis
  const clientTypes = ['Todos', 'Varejo', 'Revendedor', 'Excursão']

  // Filtrar clientes com base no termo de busca e tipo
  const filteredClients = mockClients.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm) ||
      client.city.toLowerCase().includes(searchTerm.toLowerCase())
    
    let matchesType = true
    if (selectedType !== 'Todos') {
      const typeKey = Object.keys(clientTypeLabels).find(
        key => clientTypeLabels[key] === selectedType
      )
      matchesType = client.type === typeKey
    }
    
    return matchesSearch && matchesType
  })

  return (
    <div className="p-6 space-y-6 dark:bg-gray-900">
      <div className="flex justify-between items-center">
        <h1 className="text-title">Clientes</h1>
        <Link 
          href="/dashboard/clientes/novo" 
          className="flex items-center gap-1 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md"
        >
          <Plus size={18} />
          <span>Novo Cliente</span>
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
            placeholder="Buscar clientes..."
            className="input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter size={18} className="text-gray-400 dark:text-gray-500" />
          <select
            className="select"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {clientTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Clients list */}
      <div className="table-container">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="table-header">
              <tr>
                <th scope="col">
                  Nome
                </th>
                <th scope="col">
                  Contato
                </th>
                <th scope="col">
                  Localização
                </th>
                <th scope="col">
                  Tipo
                </th>
                <th scope="col">
                  Observações
                </th>
                <th scope="col" className="text-right">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="table-body">
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    Nenhum cliente encontrado
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => (
                  <tr key={client.id} className="table-row">
                    <td className="table-cell font-medium">
                      {client.name}
                    </td>
                    <td className="table-cell-light">
                      <div>{client.phone}</div>
                      <div>{client.email}</div>
                    </td>
                    <td className="table-cell">
                      {client.city}/{client.state}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${client.type === 'RETAIL' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : 
                          client.type === 'RESELLER' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 
                          'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'}`}
                      >
                        {clientTypeLabels[client.type]}
                      </span>
                    </td>
                    <td className="table-cell-light truncate max-w-[200px]">
                      {client.notes || 'Sem observações'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                          <Edit size={18} />
                        </button>
                        <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
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
    </div>
  )
} 