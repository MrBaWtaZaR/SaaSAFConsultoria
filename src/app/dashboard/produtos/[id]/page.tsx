"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Trash, Plus, X } from 'lucide-react'

// Dados de produtos mockados 
const mockProducts = [
  {
    id: '1',
    name: 'Camiseta Básica',
    description: 'Camiseta básica de algodão',
    price: 49.90,
    cost: 25.00,
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
    cost: 80.00,
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
    cost: 60.00,
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
    cost: 45.00,
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
    cost: 100.00,
    stock: 5,
    categories: ['Calçados', 'Unissex'],
    sizes: ['38', '39', '40', '41', '42'],
    colors: ['Branco', 'Preto'],
    imageUrl: '/placeholder.jpg'
  },
]

// Simulação de serviço de produtos
const ProductService = {
  getProductById: (id: string) => {
    // Em uma implementação real, isso seria uma chamada de API
    return Promise.resolve(mockProducts.find(p => p.id === id) || null);
  },
  
  updateProduct: (product: any) => {
    // Em uma implementação real, isso seria uma chamada de API
    return Promise.resolve({ ...product, updatedAt: new Date().toISOString() });
  },
  
  deleteProduct: (id: string) => {
    // Em uma implementação real, isso seria uma chamada de API
    return Promise.resolve({ success: true });
  }
};

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params
  
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  
  // Estados para novos itens
  const [newCategory, setNewCategory] = useState('')
  const [newSize, setNewSize] = useState('')
  const [newColor, setNewColor] = useState('')

  useEffect(() => {
    // Carregar dados do produto
    const loadProduct = async () => {
      try {
        const data = await ProductService.getProductById(id)
        if (data) {
          setProduct(data)
        } else {
          router.push('/dashboard/produtos')
        }
      } catch (error) {
        console.error('Erro ao carregar produto:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadProduct()
  }, [id, router])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProduct(prev => ({ ...prev, [name]: value }))
  }
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProduct(prev => ({ ...prev, [name]: parseFloat(value) || 0 }))
  }
  
  const handleAddCategory = () => {
    if (!newCategory.trim()) return
    setProduct(prev => ({
      ...prev,
      categories: [...prev.categories, newCategory.trim()],
    }))
    setNewCategory('')
  }

  const handleRemoveCategory = (category: string) => {
    setProduct(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c !== category),
    }))
  }

  const handleAddSize = () => {
    if (!newSize.trim()) return
    setProduct(prev => ({
      ...prev,
      sizes: [...prev.sizes, newSize.trim()],
    }))
    setNewSize('')
  }

  const handleRemoveSize = (size: string) => {
    setProduct(prev => ({
      ...prev,
      sizes: prev.sizes.filter(s => s !== size),
    }))
  }

  const handleAddColor = () => {
    if (!newColor.trim()) return
    setProduct(prev => ({
      ...prev,
      colors: [...prev.colors, newColor.trim()],
    }))
    setNewColor('')
  }

  const handleRemoveColor = (color: string) => {
    setProduct(prev => ({
      ...prev,
      colors: prev.colors.filter(c => c !== color),
    }))
  }
  
  const handleSave = async () => {
    setSaving(true)
    try {
      await ProductService.updateProduct(product)
      // Em uma implementação real, aqui atualizaríamos o estado global ou o cache
      alert('Produto atualizado com sucesso!')
    } catch (error) {
      console.error('Erro ao salvar produto:', error)
      alert('Erro ao salvar produto. Tente novamente.')
    } finally {
      setSaving(false)
    }
  }
  
  const handleDelete = async () => {
    try {
      await ProductService.deleteProduct(id)
      setShowDeleteModal(false)
      router.push('/dashboard/produtos')
    } catch (error) {
      console.error('Erro ao excluir produto:', error)
      alert('Erro ao excluir produto. Tente novamente.')
    }
  }
  
  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }
  
  if (!product) {
    return (
      <div className="p-6">
        <p className="text-red-500">Produto não encontrado</p>
        <button 
          onClick={() => router.push('/dashboard/produtos')}
          className="mt-4 text-primary hover:underline"
        >
          Voltar para lista de produtos
        </button>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <button 
          onClick={() => router.push('/dashboard/produtos')}
          className="flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} className="mr-1" /> Voltar para produtos
        </button>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
          >
            <Trash size={16} />
            <span>Excluir</span>
          </button>
          
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1"></div>
                <span>Salvando...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Salvar</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      <h1 className="text-2xl font-bold mb-6">Detalhes do Produto</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nome do produto */}
          <div>
            <label 
              htmlFor="name" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nome do produto <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={product.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          
          {/* Preço */}
          <div>
            <label 
              htmlFor="price" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Preço de venda <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">R$</span>
              </div>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                required
                value={product.price}
                onChange={handleNumberChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
          
          {/* Custo */}
          <div>
            <label 
              htmlFor="cost" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Custo
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">R$</span>
              </div>
              <input
                id="cost"
                name="cost"
                type="number"
                step="0.01"
                min="0"
                value={product.cost}
                onChange={handleNumberChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
          
          {/* Estoque */}
          <div>
            <label 
              htmlFor="stock" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Estoque <span className="text-red-500">*</span>
            </label>
            <input
              id="stock"
              name="stock"
              type="number"
              min="0"
              required
              value={product.stock}
              onChange={handleNumberChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
        
        {/* Descrição */}
        <div className="mt-6">
          <label 
            htmlFor="description" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Descrição
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={product.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>
        
        {/* Categorias */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categorias
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {product.categories.map((category: string) => (
              <div key={category} className="flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full">
                <span>{category}</span>
                <button 
                  type="button"
                  onClick={() => handleRemoveCategory(category)}
                  className="ml-1 text-primary"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              placeholder="Adicionar categoria"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-primary focus:border-primary"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCategory())}
            />
            <button
              type="button"
              onClick={handleAddCategory}
              className="bg-primary text-white px-3 py-2 rounded-r-md hover:bg-primary/90"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
        
        {/* Tamanhos */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tamanhos
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {product.sizes.map((size: string) => (
              <div key={size} className="flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full">
                <span>{size}</span>
                <button 
                  type="button"
                  onClick={() => handleRemoveSize(size)}
                  className="ml-1 text-primary"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              placeholder="Adicionar tamanho"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-primary focus:border-primary"
              value={newSize}
              onChange={(e) => setNewSize(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSize())}
            />
            <button
              type="button"
              onClick={handleAddSize}
              className="bg-primary text-white px-3 py-2 rounded-r-md hover:bg-primary/90"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
        
        {/* Cores */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cores
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {product.colors.map((color: string) => (
              <div key={color} className="flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full">
                <span>{color}</span>
                <button 
                  type="button"
                  onClick={() => handleRemoveColor(color)}
                  className="ml-1 text-primary"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              placeholder="Adicionar cor"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-primary focus:border-primary"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddColor())}
            />
            <button
              type="button"
              onClick={handleAddColor}
              className="bg-primary text-white px-3 py-2 rounded-r-md hover:bg-primary/90"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Modal de Exclusão */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-4">Confirmar Exclusão</h2>
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja excluir o produto <span className="font-semibold">{product.name}</span>? Esta ação não pode ser desfeita.
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
    </div>
  )
} 