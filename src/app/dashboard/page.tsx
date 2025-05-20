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
    <div className="p-6 space-y-6 dark:bg-gray-900">
      <div className="flex justify-between items-center">
        <h1 className="text-title">Dashboard</h1>
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
          <div key={stat.id} className="card">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</h2>
                <p className="text-2xl font-bold mt-1 dark:text-white">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-full ${stat.status === 'up' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                <stat.icon 
                  size={20} 
                  className={stat.status === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} 
                />
              </div>
            </div>
            <div className={`mt-4 text-sm ${stat.status === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {stat.change} {stat.status === 'up' ? 'desde o último mês' : 'produtos'}
            </div>
          </div>
        ))}
      </div>

      {/* Charts (mock) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="card-header">Vendas dos Últimos 7 Dias</h2>
          <div className="bg-gray-100 dark:bg-gray-700 h-64 rounded flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Gráfico de vendas (simulado)</p>
          </div>
        </div>
        <div className="card">
          <h2 className="card-header">Produtos Mais Vendidos</h2>
          <div className="bg-gray-100 dark:bg-gray-700 h-64 rounded flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Gráfico de produtos (simulado)</p>
          </div>
        </div>
      </div>

      {/* Recent Sales */}
      <div className="table-container">
        <div className="p-6 border-b dark:border-gray-700">
          <h2 className="card-header">Vendas Recentes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="table-header">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Cliente
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Data
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Valor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="table-body">
              {recentSales.map((sale) => (
                <tr key={sale.id} className="table-row">
                  <td className="table-cell">
                    {sale.client}
                  </td>
                  <td className="table-cell-light">
                    {sale.date}
                  </td>
                  <td className="table-cell font-medium">
                    {sale.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      {sale.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" className="text-primary hover:text-indigo-900 dark:hover:text-indigo-300">Detalhes</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t dark:border-gray-700">
          <Link href="/dashboard/vendas" className="text-primary dark:text-primary text-sm font-medium hover:underline">
            Ver todas as vendas
          </Link>
        </div>
      </div>
    </div>
  )
} 