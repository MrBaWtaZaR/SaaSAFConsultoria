"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, X } from 'lucide-react'

export default function NewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    cost: '',
    stock: '',
    categories: [] as string[],
    sizes: [] as string[],
    colors: [] as string[],
  })

  const [newCategory, setNewCategory] = useState('')
  const [newSize, setNewSize] = useState('')
  const [newColor, setNewColor] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAddCategory = () => {
    if (!newCategory.trim()) return
    setFormData(prev => ({
      ...prev,
      categories: [...prev.categories, newCategory.trim()],
    }))
    setNewCategory('')
  }

  const handleRemoveCategory = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c !== category),
    }))
  }

  const handleAddSize = () => {
    if (!newSize.trim()) return
    setFormData(prev => ({
      ...prev,
      sizes: [...prev.sizes, newSize.trim()],
    }))
    setNewSize('')
  }

  const handleRemoveSize = (size: string) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.filter(s => s !== size),
    }))
  }

  const handleAddColor = () => {
    if (!newColor.trim()) return
    setFormData(prev => ({
      ...prev,
      colors: [...prev.colors, newColor.trim()],
    }))
    setNewColor('')
  }

  const handleRemoveColor = (color: string) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter(c => c !== color),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Este é apenas um stub mockado para simular o cadastro
    // Em uma implementação real, aqui chamaríamos a API para cadastrar o produto
    setTimeout(() => {
      setLoading(false)
      router.push('/dashboard/produtos')
    }, 1000)
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} className="mr-1" /> Voltar para produtos
        </button>
      </div>
      
      <h1 className="text-2xl font-bold mb-6">Novo Produto</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
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
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Nome do produto"
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
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="0,00"
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
                  value={formData.cost}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="0,00"
                />
              </div>
            </div>
            
            {/* Estoque */}
            <div>
              <label 
                htmlFor="stock" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Estoque inicial <span className="text-red-500">*</span>
              </label>
              <input
                id="stock"
                name="stock"
                type="number"
                min="0"
                required
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Quantidade"
              />
            </div>
          </div>
          
          {/* Descrição */}
          <div>
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
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Descrição do produto"
            />
          </div>
          
          {/* Categorias */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categorias
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.categories.map((category) => (
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
                className="bg-primary text-white px-3 rounded-r-md"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
          
          {/* Tamanhos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tamanhos
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.sizes.map((size) => (
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
                className="bg-primary text-white px-3 rounded-r-md"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
          
          {/* Cores */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cores
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.colors.map((color) => (
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
                className="bg-primary text-white px-3 rounded-r-md"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
          
          {/* Imagem (simplificado) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Imagem do produto
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none"
                  >
                    <span>Fazer upload de uma imagem</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                  </label>
                  <p className="pl-1">ou arraste e solte</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF até 2MB</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <Link 
              href="/dashboard/produtos" 
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
              ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Salvando...' : 'Salvar Produto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 