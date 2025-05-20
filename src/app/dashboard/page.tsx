import { PlusCircle, ShoppingCart, Users, Package } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  // Dados simulados para o dashboard
  const statsData = [
    { id: 1, title: 'Total de Produtos', value: '124', icon: Package, change: '+12%', status: 'up' },
    { id: 2, title: 'Vendas do Mês', value: 'R$ 5.680', icon: ShoppingCart, change: '+23%', status: 'up' },
    { id: 3, title: 'Total de Clientes', value: '47', icon: Users, change: '+8%', status: 'up' },
    { id: 4, title: 'Produtos com Baixo Estoque', value: '6', icon: Package, change: '-2', status: 'down' },
  ]

  // Dados simulados para vendas recentes
  const recentSales = [
    { id: 1, client: 'Maria Oliveira', date: '15/05/2023', total: 'R$ 354,90', status: 'Concluída' },
    { id: 2, client: 'João Silva', date: '14/05/2023', total: 'R$ 897,00', status: 'Concluída' },
    { id: 3, client: 'Ana Santos', date: '12/05/2023', total: 'R$ 1.254,50', status: 'Concluída' },
    { id: 4, client: 'Pedro Souza', date: '10/05/2023', total: 'R$ 456,20', status: 'Concluída' },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex space-x-2">
          <Link 
            href="/dashboard/produtos/novo" 
            className="flex items-center gap-1 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md"
          >
            <PlusCircle size={16} />
            <span>Novo Produto</span>
          </Link>
          <Link 
            href="/dashboard/vendas/nova" 
            className="flex items-center gap-1 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md"
          >
            <ShoppingCart size={16} />
            <span>Nova Venda</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat) => (
          <div key={stat.id} className="bg-white rounded-lg shadow p-6 flex flex-col">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-sm font-medium text-gray-500">{stat.title}</h2>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-full ${stat.status === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
                <stat.icon 
                  size={20} 
                  className={stat.status === 'up' ? 'text-green-600' : 'text-red-600'} 
                />
              </div>
            </div>
            <div className={`mt-4 text-sm ${stat.status === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change} {stat.status === 'up' ? 'desde o último mês' : 'produtos'}
            </div>
          </div>
        ))}
      </div>

      {/* Charts (mock) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Vendas dos Últimos 7 Dias</h2>
          <div className="bg-gray-100 h-64 rounded flex items-center justify-center">
            <p className="text-gray-500">Gráfico de vendas (simulado)</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Produtos Mais Vendidos</h2>
          <div className="bg-gray-100 h-64 rounded flex items-center justify-center">
            <p className="text-gray-500">Gráfico de produtos (simulado)</p>
          </div>
        </div>
      </div>

      {/* Recent Sales */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-medium">Vendas Recentes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentSales.map((sale) => (
                <tr key={sale.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{sale.client}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{sale.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {sale.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {sale.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" className="text-primary hover:text-indigo-900">Detalhes</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t">
          <Link href="/dashboard/vendas" className="text-primary text-sm font-medium hover:underline">
            Ver todas as vendas
          </Link>
        </div>
      </div>
    </div>
  )
} 