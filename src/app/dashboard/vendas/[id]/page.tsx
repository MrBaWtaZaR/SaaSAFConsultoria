"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, User, CreditCard } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Mockup de detalhes de venda
const mockSaleDetails = {
  id: '1',
  client: {
    id: '1',
    name: 'Maria Oliveira',
    phone: '(11) 98765-4321',
    type: 'RETAIL',
  },
  date: '2023-05-15',
  total: 354.90,
  discount: 0,
  paymentMethod: 'Cartão de Crédito',
  status: 'COMPLETED',
  items: [
    {
      id: '1',
      product: {
        id: '1',
        name: 'Camiseta Básica',
        imageUrl: '/placeholder.jpg',
      },
      quantity: 2,
      price: 49.90,
    },
    {
      id: '2',
      product: {
        id: '5',
        name: 'Tênis Casual',
        imageUrl: '/placeholder.jpg',
      },
      quantity: 1,
      price: 199.90,
    },
    {
      id: '3',
      product: {
        id: '4',
        name: 'Blusa de Frio',
        imageUrl: '/placeholder.jpg',
      },
      quantity: 1,
      price: 99.90,
    },
  ],
}

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

interface PageProps {
  params: {
    id: string
  }
}

export default function SaleDetailPage({ params }: PageProps) {
  const router = useRouter()
  const { id } = params
  const [sale, setSale] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Em uma implementação real, aqui buscaria os dados da venda da API
    // Simulando um carregamento
    const timer = setTimeout(() => {
      setSale(mockSaleDetails)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [id])

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-full">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-2 text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!sale) {
    return (
      <div className="p-6 space-y-6">
        <div className="mb-6">
          <button 
            onClick={() => router.push('/dashboard/vendas')}
            className="flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={16} className="mr-1" /> Voltar para vendas
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h1 className="text-xl font-medium text-red-600 mb-2">Venda não encontrada</h1>
          <p className="text-gray-600 mb-4">A venda com o ID #{id} não foi encontrada.</p>
          <Link 
            href="/dashboard/vendas" 
            className="inline-flex items-center text-primary hover:underline"
          >
            <ArrowLeft size={16} className="mr-1" /> Retornar para lista de vendas
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="mb-6">
        <button 
          onClick={() => router.push('/dashboard/vendas')}
          className="flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} className="mr-1" /> Voltar para vendas
        </button>
      </div>
      
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Detalhes da Venda #{sale.id}</h1>
        <div>
          <span 
            className={`px-3 py-1 text-sm font-semibold rounded-full 
            ${sale.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 
              sale.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
              'bg-red-100 text-red-800'}`}
          >
            {saleStatusLabels[sale.status]}
          </span>
        </div>
      </div>
      
      {/* Informações da venda */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4 flex items-center">
            <Calendar size={18} className="mr-2 text-gray-500" />
            Informações da Venda
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Data:</span>
              <span className="font-medium">{formatDate(sale.date)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Forma de Pagamento:</span>
              <span className="font-medium">{sale.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">R$ {(sale.total + sale.discount).toFixed(2)}</span>
            </div>
            {sale.discount > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Desconto:</span>
                <span className="font-medium text-green-600">- R$ {sale.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t">
              <span className="text-gray-700 font-medium">Total:</span>
              <span className="font-bold text-lg">R$ {sale.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4 flex items-center">
            <User size={18} className="mr-2 text-gray-500" />
            Informações do Cliente
          </h2>
          {sale.client ? (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Nome:</span>
                <Link 
                  href={`/dashboard/clientes/${sale.client.id}`}
                  className="font-medium text-primary hover:underline"
                >
                  {sale.client.name}
                </Link>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Telefone:</span>
                <span className="font-medium">{sale.client.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tipo:</span>
                <span className="font-medium">
                  {sale.client.type === 'RETAIL' ? 'Varejo' : 
                   sale.client.type === 'RESELLER' ? 'Revendedor' : 'Excursão'}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-gray-500 text-center py-4">
              Cliente não cadastrado
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4 flex items-center">
            <CreditCard size={18} className="mr-2 text-gray-500" />
            Ações
          </h2>
          <div className="space-y-3">
            <button 
              className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-md transition-colors"
              onClick={() => window.print()}
            >
              Imprimir Comprovante
            </button>
            {sale.status !== 'COMPLETED' && (
              <button className="w-full bg-green-50 hover:bg-green-100 text-green-700 py-2 px-4 rounded-md transition-colors">
                Finalizar Venda
              </button>
            )}
            {sale.status !== 'CANCELED' && (
              <button className="w-full bg-red-50 hover:bg-red-100 text-red-700 py-2 px-4 rounded-md transition-colors">
                Cancelar Venda
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Itens da venda */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-medium">Itens da Venda</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preço Unitário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantidade
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sale.items.map((item: any) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-200 rounded-md flex-shrink-0"></div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.product.name}</div>
                        <div className="text-xs text-gray-500">ID: {item.product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">R$ {item.price.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.quantity}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan={3} className="px-6 py-4 text-right font-medium">
                  Total:
                </td>
                <td className="px-6 py-4 text-right font-bold">
                  R$ {sale.total.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
} 