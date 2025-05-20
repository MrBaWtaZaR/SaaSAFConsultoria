"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Printer, Edit, Trash } from 'lucide-react'

// Dados simulados de venda
const mockSale = {
  id: '6',
  date: '2023-10-15',
  client: {
    id: '1',
    name: 'Maria Oliveira',
    email: 'maria.oliveira@exemplo.com',
    phone: '(11) 98765-4321',
  },
  items: [
    {
      id: '1',
      productId: '1',
      productName: 'Camiseta Básica',
      size: 'M',
      color: 'Preto',
      quantity: 2,
      unitPrice: 49.90,
      total: 99.80,
    },
    {
      id: '2',
      productId: '4',
      productName: 'Blusa de Frio',
      size: 'G',
      color: 'Cinza',
      quantity: 1,
      unitPrice: 99.90,
      total: 99.90,
    }
  ],
  paymentMethod: 'credit',
  installments: 3,
  discount: 20,
  notes: 'Cliente solicitou entrega na segunda-feira',
  status: 'completed',
  totalAmount: 179.70,
}

export default function SaleDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [sale, setSale] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Em uma implementação real, aqui faríamos uma chamada de API
    // para buscar os detalhes da venda com o ID fornecido
    const fetchSale = async () => {
      try {
        // Simulação de uma chamada de API
        await new Promise(resolve => setTimeout(resolve, 500))
        
        if (params.id === '6') {
          setSale(mockSale)
        } else {
          // Redirecionar para 404 ou exibir mensagem de erro
          alert('Venda não encontrada')
          router.push('/dashboard/vendas')
        }
      } catch (error) {
        console.error('Erro ao buscar detalhes da venda:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchSale()
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
  
  // Obter nome do método de pagamento
  const getPaymentMethodName = (method: string) => {
    const methods: Record<string, string> = {
      credit: 'Cartão de Crédito',
      debit: 'Cartão de Débito',
      cash: 'Dinheiro',
      pix: 'PIX',
      transfer: 'Transferência Bancária',
    }
    
    return methods[method] || method
  }
  
  // Obter status da venda
  const getSaleStatusName = (status: string) => {
    const statuses: Record<string, { name: string, color: string }> = {
      pending: { name: 'Pendente', color: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400' },
      processing: { name: 'Em Processamento', color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400' },
      completed: { name: 'Concluída', color: 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400' },
      canceled: { name: 'Cancelada', color: 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400' },
    }
    
    return statuses[status] || { name: status, color: 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400' }
  }
  
  // Função para imprimir a venda
  const handlePrintSale = () => {
    window.print()
  }
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }
  
  if (!sale) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg text-gray-600 dark:text-gray-400">Venda não encontrada</p>
        <button 
          onClick={() => router.push('/dashboard/vendas')}
          className="mt-4 inline-flex items-center text-primary hover:text-primary/80"
        >
          <ArrowLeft size={16} className="mr-2" /> Voltar para lista de vendas
        </button>
      </div>
    )
  }
  
  const status = getSaleStatusName(sale.status)

  return (
    <div className="p-6 dark:bg-gray-900">
      <div className="mb-6 flex items-center justify-between">
        <button 
          onClick={() => router.push('/dashboard/vendas')}
          className="flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <ArrowLeft size={16} className="mr-1" /> Voltar para vendas
        </button>
        
        <div className="flex space-x-2 print:hidden">
          <button
            onClick={handlePrintSale}
            className="flex items-center gap-1 text-gray-700 hover:text-gray-900 bg-white border border-gray-300 rounded px-3 py-1.5 text-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:text-white"
          >
            <Printer size={16} />
            <span>Imprimir</span>
          </button>
          
          <button
            onClick={() => alert('Funcionalidade de edição a ser implementada')}
            className="flex items-center gap-1 text-blue-700 hover:text-blue-800 bg-blue-50 border border-blue-200 rounded px-3 py-1.5 text-sm dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800 dark:hover:text-blue-300"
          >
            <Edit size={16} />
            <span>Editar</span>
          </button>
          
          <button
            onClick={() => alert('Funcionalidade de cancelamento a ser implementada')}
            className="flex items-center gap-1 text-red-700 hover:text-red-800 bg-red-50 border border-red-200 rounded px-3 py-1.5 text-sm dark:bg-red-900/30 dark:text-red-400 dark:border-red-800 dark:hover:text-red-300"
          >
            <Trash size={16} />
            <span>Cancelar</span>
          </button>
        </div>
      </div>
      
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Venda #{sale.id}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {formatDate(sale.date)}
          </p>
        </div>
        
        <div className="print:absolute print:top-4 print:right-6">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
            {status.name}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informações da venda e itens */}
        <div className="lg:col-span-2 space-y-6">
          {/* Cliente e informações gerais */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4 dark:text-white">Informações da Venda</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Cliente</h3>
                <p className="mt-1 text-base font-medium dark:text-white">{sale.client.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{sale.client.email}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{sale.client.phone}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Pagamento</h3>
                <p className="mt-1 text-base font-medium dark:text-white">
                  {getPaymentMethodName(sale.paymentMethod)}
                </p>
                {sale.paymentMethod === 'credit' && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {sale.installments}x de {formatCurrency(sale.totalAmount / sale.installments)}
                  </p>
                )}
              </div>
              
              {sale.notes && (
                <div className="sm:col-span-2">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Observações</h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{sale.notes}</p>
                </div>
              )}
            </div>
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
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {sale.items.map((item: any) => (
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
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(item.total)}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Resumo do pagamento */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 sticky top-6">
            <h2 className="text-lg font-medium mb-4 dark:text-white">Resumo</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                <span className="font-medium dark:text-white">{formatCurrency(sale.items.reduce((sum: number, item: any) => sum + item.total, 0))}</span>
              </div>
              
              {sale.discount > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Desconto:</span>
                  <span className="font-medium text-red-600 dark:text-red-400">-{formatCurrency(sale.discount)}</span>
                </div>
              )}
              
              <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                <span className="font-medium dark:text-white">Total:</span>
                <span className="text-xl font-bold text-primary">{formatCurrency(sale.totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 