"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Edit, Trash, Package, Tag } from 'lucide-react'

// Dados simulados de produto
const mockProduct = {
  id: '1',
  name: 'Camiseta Básica',
  description: 'Camiseta básica de algodão, corte regular e acabamento premium. Ideal para o dia a dia com conforto e estilo.',
  price: 49.90,
  cost: 22.50,
  stock: 25,
  categories: ['Camisetas', 'Masculino'],
  sizes: ['PP', 'P', 'M', 'G', 'GG'],
  colors: [
    { name: 'Preto', stock: 10, hex: '#000000' },
    { name: 'Branco', stock: 8, hex: '#FFFFFF' },
    { name: 'Azul', stock: 7, hex: '#1E40AF' }
  ],
  createdAt: '2023-04-15',
  updatedAt: '2023-09-22',
  status: 'active',
  featured: true,
  sku: 'CAM-BAS-001',
  barcode: '7898765432109',
  supplier: {
    id: '1',
    name: 'Fornecedor Têxtil Central',
    contact: 'contato@textilcentral.com.br'
  }
}

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Em uma implementação real, aqui faríamos uma chamada de API
    // para buscar os detalhes do produto com o ID fornecido
    const fetchProduct = async () => {
      try {
        // Simulação de uma chamada de API
        await new Promise(resolve => setTimeout(resolve, 500))
        
        if (params.id === '1') {
          setProduct(mockProduct)
        } else {
          // Redirecionar para 404 ou exibir mensagem de erro
          alert('Produto não encontrado')
          router.push('/dashboard/produtos')
        }
      } catch (error) {
        console.error('Erro ao buscar detalhes do produto:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProduct()
  }, [params.id, router])
  
  // Formatar valores monetários
  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2)}`
  }
  
  // Formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR')
  }
  
  // Obter status do produto
  const getProductStatus = (status: string) => {
    const statuses: Record<string, { name: string, color: string }> = {
      active: { name: 'Ativo', color: 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400' },
      inactive: { name: 'Inativo', color: 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400' },
      out_of_stock: { name: 'Sem Estoque', color: 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400' },
    }
    
    return statuses[status] || { name: status, color: 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400' }
  }
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }
  
  if (!product) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg text-gray-600 dark:text-gray-400">Produto não encontrado</p>
        <button 
          onClick={() => router.push('/dashboard/produtos')}
          className="mt-4 inline-flex items-center text-primary hover:text-primary/80"
        >
          <ArrowLeft size={16} className="mr-2" /> Voltar para lista de produtos
        </button>
      </div>
    )
  }
  
  const status = getProductStatus(product.status)
  const profitMargin = ((product.price - product.cost) / product.price) * 100

  return (
    <div className="p-6 dark:bg-gray-900">
      <div className="mb-6 flex items-center justify-between">
        <button 
          onClick={() => router.push('/dashboard/produtos')}
          className="flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <ArrowLeft size={16} className="mr-1" /> Voltar para produtos
        </button>
        
        <div className="flex space-x-2">
          <button
            onClick={() => router.push(`/dashboard/produtos/editar/${product.id}`)}
            className="flex items-center gap-1 text-blue-700 hover:text-blue-800 bg-blue-50 border border-blue-200 rounded px-3 py-1.5 text-sm dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800 dark:hover:text-blue-300"
          >
            <Edit size={16} />
            <span>Editar</span>
          </button>
          
          <button
            onClick={() => alert('Funcionalidade de remoção a ser implementada')}
            className="flex items-center gap-1 text-red-700 hover:text-red-800 bg-red-50 border border-red-200 rounded px-3 py-1.5 text-sm dark:bg-red-900/30 dark:text-red-400 dark:border-red-800 dark:hover:text-red-300"
          >
            <Trash size={16} />
            <span>Remover</span>
          </button>
        </div>
      </div>
      
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">{product.name}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            SKU: {product.sku} • Cadastrado em {formatDate(product.createdAt)}
          </p>
        </div>
        
        <div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
            {status.name}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informações principais */}
        <div className="lg:col-span-2 space-y-6">
          {/* Detalhes do produto */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4 dark:text-white">Detalhes do Produto</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Descrição</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{product.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Categorias</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.categories.map((category: string, index: number) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                      >
                        <Tag size={12} className="mr-1" />
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Fornecedor</h3>
                  <p className="mt-1 text-sm text-gray-900 dark:text-gray-300">{product.supplier.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{product.supplier.contact}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Estoque e variações */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-6 border-b dark:border-gray-700">
              <h2 className="text-lg font-medium dark:text-white">Estoque e Variações</h2>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Tamanhos Disponíveis</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size: string, index: number) => (
                    <span 
                      key={index} 
                      className="inline-block px-3 py-1 border border-gray-300 rounded-md text-sm font-medium dark:border-gray-600 dark:text-gray-300"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Cores Disponíveis</h3>
                <div className="space-y-2">
                  {product.colors.map((color: any, index: number) => (
                    <div key={index} className="flex items-center">
                      <span 
                        className="w-4 h-4 rounded-full mr-2 border border-gray-300"
                        style={{ backgroundColor: color.hex }}
                      ></span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{color.name}</span>
                      <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
                        Estoque: {color.stock}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="border-t dark:border-gray-700">
              <div className="p-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Histórico de Estoque</h3>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Informações detalhadas sobre o histórico de estoque estarão disponíveis em futuras atualizações.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Resumo e informações financeiras */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4 dark:text-white">Informações Comerciais</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Preço de Venda</h3>
                  <p className="mt-1 text-xl font-bold text-primary">{formatCurrency(product.price)}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Custo</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900 dark:text-gray-300">{formatCurrency(product.cost)}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Margem de Lucro</h3>
                <div className="mt-1">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div 
                      className="bg-primary h-2.5 rounded-full" 
                      style={{ width: `${profitMargin}%` }}
                    ></div>
                  </div>
                  <p className="mt-1 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                    {profitMargin.toFixed(1)}%
                  </p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Estoque Total</h3>
                <div className="mt-2 flex items-center">
                  <Package className="w-5 h-5 text-gray-400 mr-2" />
                  <p className="text-lg font-medium text-gray-900 dark:text-gray-300">{product.stock} unidades</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4 dark:text-white">Códigos do Produto</h2>
            
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">SKU</h3>
                <p className="mt-1 text-sm font-mono bg-gray-100 dark:bg-gray-700 p-1.5 rounded">{product.sku}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Código de Barras</h3>
                <p className="mt-1 text-sm font-mono bg-gray-100 dark:bg-gray-700 p-1.5 rounded">{product.barcode}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4 dark:text-white">Últimas Vendas</h2>
            
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                O histórico de vendas deste produto estará disponível em futuras atualizações.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 