"use client"

import { useState, useEffect } from 'react'
import { Search, Filter, Edit, Trash, Check, X, Plus } from 'lucide-react'

// Mock de dados de clientes do SAAS
const mockSaasClients = [
  {
    id: '1',
    businessName: 'Loja Elegância Moda',
    ownerName: 'Maria Silva',
    email: 'maria@elegancia.com.br',
    phone: '(11) 98765-4321',
    plan: 'Profissional',
    status: 'Ativo',
    createdAt: '2023-01-15T00:00:00.000Z'
  },
  {
    id: '2',
    businessName: 'Fashion Store',
    ownerName: 'João Oliveira',
    email: 'joao@fashionstore.com.br',
    phone: '(11) 91234-5678',
    plan: 'Básico',
    status: 'Ativo',
    createdAt: '2023-02-20T00:00:00.000Z'
  },
  {
    id: '3',
    businessName: 'Boutique Chique',
    ownerName: 'Ana Ferreira',
    email: 'ana@boutiquechique.com.br',
    phone: '(21) 99876-5432',
    plan: 'Profissional',
    status: 'Ativo',
    createdAt: '2023-03-10T00:00:00.000Z'
  },
  {
    id: '4',
    businessName: 'Moda Atual',
    ownerName: 'Carlos Santos',
    email: 'carlos@modaatual.com.br',
    phone: '(31) 98765-1234',
    plan: 'Básico',
    status: 'Inativo',
    createdAt: '2023-01-05T00:00:00.000Z'
  },
  {
    id: '5',
    businessName: 'Roupas & Cia',
    ownerName: 'Amanda Costa',
    email: 'amanda@roupasecia.com.br',
    phone: '(41) 99999-8888',
    plan: 'Gratuito',
    status: 'Ativo',
    createdAt: '2023-04-15T00:00:00.000Z'
  }
];

export default function AdminClientsPage() {
  // Estado para armazenar a lista de clientes
  const [clients, setClients] = useState(mockSaasClients)
  // Estado para busca e filtros
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('Todos')
  const [planFilter, setPlanFilter] = useState('Todos')
  
  // Estados para modal de edição
  const [showEditModal, setShowEditModal] = useState(false)
  const [currentClient, setCurrentClient] = useState<any>(null)
  
  // Estado para modal de exclusão
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [clientToDelete, setClientToDelete] = useState<string | null>(null)
  
  // Estado para modal de adição
  const [showAddModal, setShowAddModal] = useState(false)
  const [newClient, setNewClient] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    plan: 'Básico',
    status: 'Ativo'
  })

  // Filtrar clientes com base nos critérios de busca e filtros
  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'Todos' || client.status === statusFilter
    const matchesPlan = planFilter === 'Todos' || client.plan === planFilter
    
    return matchesSearch && matchesStatus && matchesPlan
  })

  // Função para abrir modal de edição
  const handleEdit = (client: any) => {
    setCurrentClient({...client})
    setShowEditModal(true)
  }
  
  // Função para salvar edição
  const handleSaveEdit = () => {
    if (currentClient) {
      setClients(prevClients => 
        prevClients.map(client => 
          client.id === currentClient.id ? currentClient : client
        )
      )
    }
    setShowEditModal(false)
  }
  
  // Função para abrir modal de exclusão
  const handleDeleteConfirm = (id: string) => {
    setClientToDelete(id)
    setShowDeleteModal(true)
  }
  
  // Função para confirmar exclusão
  const handleDelete = () => {
    if (clientToDelete) {
      setClients(prevClients => 
        prevClients.filter(client => client.id !== clientToDelete)
      )
    }
    setShowDeleteModal(false)
    setClientToDelete(null)
  }
  
  // Função para adicionar novo cliente
  const handleAddClient = () => {
    const newId = (Math.max(...clients.map(c => parseInt(c.id))) + 1).toString()
    const createdAt = new Date().toISOString()
    
    setClients(prev => [
      ...prev, 
      {
        id: newId,
        ...newClient,
        createdAt
      }
    ])
    
    setShowAddModal(false)
    setNewClient({
      businessName: '',
      ownerName: '',
      email: '',
      phone: '',
      plan: 'Básico',
      status: 'Ativo'
    })
  }

  // Formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR')
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md"
        >
          <Plus size={18} />
          <span>Novo Cliente</span>
        </button>
      </div>

      {/* Filtros e busca */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar clientes..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-400" />
          <select
            className="block w-full py-2 pl-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="Todos">Todos os Status</option>
            <option value="Ativo">Ativos</option>
            <option value="Inativo">Inativos</option>
          </select>
        </div>
        
        <div>
          <select
            className="block w-full py-2 pl-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
          >
            <option value="Todos">Todos os Planos</option>
            <option value="Gratuito">Gratuito</option>
            <option value="Básico">Básico</option>
            <option value="Profissional">Profissional</option>
          </select>
        </div>
      </div>

      {/* Lista de clientes */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Empresa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Proprietário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  E-mail
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plano
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Desde
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    Nenhum cliente encontrado
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => (
                  <tr key={client.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{client.businessName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{client.ownerName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{client.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{client.plan}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${client.status === 'Ativo' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'}`}
                      >
                        {client.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{formatDate(client.createdAt)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button 
                          className="text-blue-600 hover:text-blue-900"
                          onClick={() => handleEdit(client)}
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDeleteConfirm(client.id)}
                        >
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
      
      {/* Modal de Edição */}
      {showEditModal && currentClient && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-4">Editar Cliente</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome da Empresa
                </label>
                <input
                  type="text"
                  value={currentClient.businessName}
                  onChange={(e) => setCurrentClient({...currentClient, businessName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Proprietário
                </label>
                <input
                  type="text"
                  value={currentClient.ownerName}
                  onChange={(e) => setCurrentClient({...currentClient, ownerName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  value={currentClient.email}
                  onChange={(e) => setCurrentClient({...currentClient, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                <input
                  type="text"
                  value={currentClient.phone}
                  onChange={(e) => setCurrentClient({...currentClient, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Plano
                </label>
                <select
                  value={currentClient.plan}
                  onChange={(e) => setCurrentClient({...currentClient, plan: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Gratuito">Gratuito</option>
                  <option value="Básico">Básico</option>
                  <option value="Profissional">Profissional</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={currentClient.status}
                  onChange={(e) => setCurrentClient({...currentClient, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal de Exclusão */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-4">Confirmar Exclusão</h2>
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita.
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal de Adição */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-4">Novo Cliente</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome da Empresa
                </label>
                <input
                  type="text"
                  value={newClient.businessName}
                  onChange={(e) => setNewClient({...newClient, businessName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Proprietário
                </label>
                <input
                  type="text"
                  value={newClient.ownerName}
                  onChange={(e) => setNewClient({...newClient, ownerName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  value={newClient.email}
                  onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                <input
                  type="text"
                  value={newClient.phone}
                  onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Plano
                </label>
                <select
                  value={newClient.plan}
                  onChange={(e) => setNewClient({...newClient, plan: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Gratuito">Gratuito</option>
                  <option value="Básico">Básico</option>
                  <option value="Profissional">Profissional</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={newClient.status}
                  onChange={(e) => setNewClient({...newClient, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddClient}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 