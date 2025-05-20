"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Plus, Edit, Trash, Search, Filter } from 'lucide-react'

// Dados simulados de produtos
const mockProducts = [
  {
    id: '1',
    name: 'Camiseta Básica',
    description: 'Camiseta básica de algodão',
    price: 49.90,
    stock: 25,
    categories: ['Camisetas', 'Masculino'],
    sizes: ['P', 'M', 'G'],
    colors: ['Preto', 'Branco', 'Azul'],
    imageUrl: '/placeholder.jpg'
  },
  {
    id: '2',
    name: 'Vestido Longo',
    description: 'Vestido longo estampado',
    price: 159.90,
    stock: 10,
    categories: ['Vestidos', 'Feminino'],
    sizes: ['P', 'M', 'G'],
    colors: ['Floral', 'Azul'],
    imageUrl: '/placeholder.jpg'
  },
  {
    id: '3',
    name: 'Calça Jeans Slim',
    description: 'Calça jeans slim fit',
    price: 119.90,
    stock: 15,
    categories: ['Calças', 'Masculino'],
    sizes: ['38', '40', '42', '44'],
    colors: ['Azul Claro', 'Azul Escuro'],
    imageUrl: '/placeholder.jpg'
  },
  {
    id: '4',
    name: 'Blusa de Frio',
    description: 'Blusa de frio com capuz',
    price: 99.90,
    stock: 8,
    categories: ['Blusas', 'Unissex'],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Cinza', 'Preto', 'Vermelho'],
    imageUrl: '/placeholder.jpg'
  },
  {
    id: '5',
    name: 'Tênis Casual',
    description: 'Tênis casual para o dia a dia',
    price: 199.90,
    stock: 5,
    categories: ['Calçados', 'Unissex'],
    sizes: ['38', '39', '40', '41', '42'],
    colors: ['Branco', 'Preto'],
    imageUrl: '/placeholder.jpg'
  },
]

export default function ProductsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [products, setProducts] = useState(mockProducts)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)

  // Categorias disponíveis
  const categories = ['Todos', 'Camisetas', 'Vestidos', 'Calças', 'Blusas', 'Calçados']

  // Filtrar produtos com base no termo de busca e categoria
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'Todos' || 
                           product.categories.includes(selectedCategory)
    
    return matchesSearch && matchesCategory
  })
  
  // Função para abrir o modal de exclusão
  const handleDeleteConfirm = (id: string) => {
    setProductToDelete(id)
    setShowDeleteModal(true)
  }
  
  // Função para excluir um produto
  const handleDelete = () => {
    if (productToDelete) {
      setProducts(prev => prev.filter(product => product.id !== productToDelete))
      setShowDeleteModal(false)
      setProductToDelete(null)
    }
  }
  
  // Função para navegar para a página de edição
  const handleEdit = (id: string) => {
    router.push(`/dashboard/produtos/${id}`)
  }

  return (
    <div className="p-6 space-y-6 dark:bg-gray-900">
      <div className="flex justify-between items-center">
        <h1 className="text-title">Produtos</h1>
        <Link 
          href="/dashboard/produtos/novo" 
          className="flex items-center gap-1 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md"
        >
          <Plus size={18} />
          <span>Novo Produto</span>
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
            placeholder="Buscar produtos..."
            className="input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter size={18} className="text-gray-400 dark:text-gray-500" />
          <select
            className="select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products list */}
      <div className="table-container">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="table-header">
              <tr>
                <th scope="col">
                  Produto
                </th>
                <th scope="col">
                  Preço
                </th>
                <th scope="col">
                  Estoque
                </th>
                <th scope="col">
                  Categoria
                </th>
                <th scope="col">
                  Variações
                </th>
                <th scope="col" className="text-right">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="table-body">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    Nenhum produto encontrado
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="table-row" onClick={() => handleEdit(product.id)}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-md flex-shrink-0"></div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{product.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      R$ {product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${product.stock <= 10 ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-gray-200'}`}>
                        {product.stock} unidades
                      </div>
                    </td>
                    <td className="table-cell">
                      {product.categories.join(', ')}
                    </td>
                    <td className="table-cell-light">
                      {product.sizes.length} tamanhos, {product.colors.length} cores
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button 
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEdit(product.id)
                          }}
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteConfirm(product.id)
                          }}
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
      
      {/* Modal de Exclusão */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Confirmar Exclusão</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-800"
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
    </div>
  )
} 