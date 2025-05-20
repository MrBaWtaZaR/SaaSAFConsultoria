"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, Trash, Search, Save } from 'lucide-react'

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
  },
]

// Dados simulados de clientes
const mockClients = [
  {
    id: '1',
    name: 'Maria Oliveira',
    email: 'maria.oliveira@exemplo.com',
    phone: '(11) 98765-4321',
  },
  {
    id: '2',
    name: 'João Silva',
    email: 'joao.silva@exemplo.com',
    phone: '(21) 99876-5432',
  },
  {
    id: '3',
    name: 'Ana Santos',
    email: 'ana.santos@exemplo.com',
    phone: '(31) 97654-3210',
  },
  {
    id: '4',
    name: 'Pedro Souza',
    email: 'pedro.souza@exemplo.com',
    phone: '(41) 96543-2109',
  },
]

// Métodos de pagamento suportados
const paymentMethods = [
  { id: 'credit', name: 'Cartão de Crédito' },
  { id: 'debit', name: 'Cartão de Débito' },
  { id: 'cash', name: 'Dinheiro' },
  { id: 'pix', name: 'PIX' },
  { id: 'transfer', name: 'Transferência Bancária' },
]

export default function NewSalePage() {
  const router = useRouter()
  
  // Estado para a venda
  const [sale, setSale] = useState({
    clientId: '',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: 'credit',
    installments: 1,
    items: [] as any[],
    discount: 0,
    notes: '',
  })
  
  // Estados para produtos
  const [selectedProduct, setSelectedProduct] = useState('')
  const [productSearchTerm, setProductSearchTerm] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  
  // Estado para busca de clientes
  const [clientSearchTerm, setClientSearchTerm] = useState('')
  
  // Estado para carregamento
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Produto selecionado
  const currentProduct = mockProducts.find(p => p.id === selectedProduct)
  
  // Função para adicionar item à venda
  const handleAddItem = () => {
    if (!selectedProduct || !selectedSize || !selectedColor || quantity <= 0 || !currentProduct) {
      alert('Por favor, selecione um produto, tamanho, cor e quantidade válida.')
      return
    }
    
    const newItem = {
      id: Date.now().toString(),
      productId: selectedProduct,
      productName: currentProduct.name,
      size: selectedSize,
      color: selectedColor,
      quantity,
      unitPrice: currentProduct.price,
      total: currentProduct.price * quantity,
    }
    
    setSale(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }))
    
    // Limpar seleção
    setSelectedProduct('')
    setSelectedSize('')
    setSelectedColor('')
    setQuantity(1)
  }
  
  // Função para remover item da venda
  const handleRemoveItem = (itemId: string) => {
    setSale(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }))
  }
  
  // Função para salvar a venda
  const handleSaveSale = async () => {
    if (!sale.clientId) {
      alert('Por favor, selecione um cliente.')
      return
    }
    
    if (sale.items.length === 0) {
      alert('Por favor, adicione pelo menos um item à venda.')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Em uma implementação real, aqui chamaríamos uma API para salvar a venda
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirecionar para a lista de vendas
      router.push('/dashboard/vendas')
    } catch (error) {
      console.error('Erro ao salvar venda:', error)
      alert('Ocorreu um erro ao salvar a venda. Tente novamente.')
      setIsSubmitting(false)
    }
  }
  
  // Calcular total da venda
  const subtotal = sale.items.reduce((sum, item) => sum + item.total, 0)
  const totalWithDiscount = subtotal - (sale.discount || 0)
  
  // Filtrar produtos pela busca
  const filteredProducts = mockProducts.filter(product => 
    product.name.toLowerCase().includes(productSearchTerm.toLowerCase())
  )
  
  // Filtrar clientes pela busca
  const filteredClients = mockClients.filter(client => 
    client.name.toLowerCase().includes(clientSearchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(clientSearchTerm.toLowerCase()) ||
    client.phone.includes(clientSearchTerm)
  )
  
  // Formatar valores monetários
  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2)}`
  }

  return (
    <div className="p-6 dark:bg-gray-900">
      <div className="mb-6">
        <button 
          onClick={() => router.push('/dashboard/vendas')}
          className="flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <ArrowLeft size={16} className="mr-1" /> Voltar para vendas
        </button>
      </div>
      
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Registrar Nova Venda</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna esquerda - Dados da venda */}
        <div className="lg:col-span-2 space-y-6">
          {/* Cliente e data */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4 dark:text-white">Informações da Venda</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Cliente
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar cliente..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                    value={clientSearchTerm}
                    onChange={(e) => setClientSearchTerm(e.target.value)}
                  />
                  
                  {clientSearchTerm && (
                    <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
                      {filteredClients.length === 0 ? (
                        <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                          Nenhum cliente encontrado
                        </div>
                      ) : (
                        filteredClients.map(client => (
                          <div 
                            key={client.id}
                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                            onClick={() => {
                              setSale(prev => ({ ...prev, clientId: client.id }))
                              setClientSearchTerm(client.name)
                            }}
                          >
                            <div className="font-medium dark:text-white">{client.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{client.email} • {client.phone}</div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Data da Venda
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                  value={sale.date}
                  onChange={(e) => setSale(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
            </div>
          </div>
          
          {/* Produtos */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4 dark:text-white">Adicionar Produtos</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Produto
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Buscar produto..."
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                    value={productSearchTerm}
                    onChange={(e) => setProductSearchTerm(e.target.value)}
                  />
                  
                  {productSearchTerm && !selectedProduct && (
                    <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
                      {filteredProducts.length === 0 ? (
                        <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                          Nenhum produto encontrado
                        </div>
                      ) : (
                        filteredProducts.map(product => (
                          <div 
                            key={product.id}
                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                            onClick={() => {
                              setSelectedProduct(product.id)
                              setProductSearchTerm(product.name)
                            }}
                          >
                            <div className="font-medium dark:text-white">{product.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{formatCurrency(product.price)} • Estoque: {product.stock}</div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Quantidade
                </label>
                <input
                  type="number"
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                />
              </div>
              
              {selectedProduct && currentProduct && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Tamanho
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                    >
                      <option value="">Selecione o tamanho</option>
                      {currentProduct.sizes.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Cor
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                    >
                      <option value="">Selecione a cor</option>
                      {currentProduct.colors.map(color => (
                        <option key={color} value={color}>{color}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </div>
            
            <button
              type="button"
              onClick={handleAddItem}
              disabled={!selectedProduct || !selectedSize || !selectedColor || quantity <= 0}
              className="flex items-center gap-1 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={16} />
              <span>Adicionar Item</span>
            </button>
          </div>
          
          {/* Itens da venda */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-6 border-b dark:border-gray-700">
              <h2 className="text-lg font-medium dark:text-white">Itens da Venda</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Produto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Variação
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Preço Unit.
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Qtd.
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {sale.items.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                        Nenhum item adicionado
                      </td>
                    </tr>
                  ) : (
                    sale.items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{item.productName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-400">{item.size} • {item.color}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{formatCurrency(item.unitPrice)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{item.quantity}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(item.total)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            className="text-red-600 hover:text-red-900 dark:text-red-500 dark:hover:text-red-400"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <Trash size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Coluna direita - Resumo e pagamento */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4 dark:text-white">Resumo da Venda</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                <span className="font-medium dark:text-white">{formatCurrency(subtotal)}</span>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Desconto (R$)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                  value={sale.discount || ''}
                  onChange={(e) => setSale(prev => ({ ...prev, discount: parseFloat(e.target.value) || 0 }))}
                />
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                <span className="font-medium dark:text-white">Total:</span>
                <span className="text-xl font-bold text-primary">{formatCurrency(totalWithDiscount)}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4 dark:text-white">Forma de Pagamento</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Método de Pagamento
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                  value={sale.paymentMethod}
                  onChange={(e) => setSale(prev => ({ ...prev, paymentMethod: e.target.value }))}
                >
                  {paymentMethods.map(method => (
                    <option key={method.id} value={method.id}>{method.name}</option>
                  ))}
                </select>
              </div>
              
              {sale.paymentMethod === 'credit' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Parcelas
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                    value={sale.installments}
                    onChange={(e) => setSale(prev => ({ ...prev, installments: parseInt(e.target.value) }))}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
                      <option key={num} value={num}>{num}x {formatCurrency(totalWithDiscount / num)}</option>
                    ))}
                  </select>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Observações
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                  value={sale.notes}
                  onChange={(e) => setSale(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Observações sobre a venda..."
                />
              </div>
            </div>
          </div>
          
          <button
            onClick={handleSaveSale}
            disabled={isSubmitting || sale.items.length === 0 || !sale.clientId}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Registrando...</span>
              </>
            ) : (
              <>
                <Save size={18} />
                <span>Finalizar Venda</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
} 