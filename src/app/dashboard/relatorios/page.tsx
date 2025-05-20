"use client"

import { useState } from 'react'
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts'
import { Calendar, Package, ShoppingCart, TrendingUp, Zap } from 'lucide-react'

// Dados de vendas diárias dos últimos 7 dias
const salesData = [
  { name: '15/05', vendas: 2450 },
  { name: '16/05', vendas: 1350 },
  { name: '17/05', vendas: 3250 },
  { name: '18/05', vendas: 4520 },
  { name: '19/05', vendas: 2800 },
  { name: '20/05', vendas: 1980 },
  { name: '21/05', vendas: 3100 },
]

// Dados de vendas por forma de pagamento
const paymentMethodData = [
  { name: 'Cartão de Crédito', value: 45 },
  { name: 'PIX', value: 30 },
  { name: 'Dinheiro', value: 15 },
  { name: 'Cartão de Débito', value: 10 },
]

// Dados dos produtos mais vendidos
const topProductsData = [
  { name: 'Camiseta Básica', vendas: 48 },
  { name: 'Vestido Longo', vendas: 30 },
  { name: 'Calça Jeans', vendas: 27 },
  { name: 'Tênis Casual', vendas: 21 },
  { name: 'Blusa de Frio', vendas: 19 },
]

// Estatísticas gerais
const statsData = [
  { 
    id: 1, 
    title: 'Vendas do Mês', 
    value: 'R$ 45.780,00', 
    icon: ShoppingCart, 
    change: '+23%', 
    status: 'up',
    color: 'green' 
  },
  { 
    id: 2, 
    title: 'Ticket Médio', 
    value: 'R$ 187,50', 
    icon: TrendingUp, 
    change: '+5%', 
    status: 'up',
    color: 'blue' 
  },
  { 
    id: 3, 
    title: 'Total de Vendas', 
    value: '244', 
    icon: Zap, 
    change: '+18%', 
    status: 'up',
    color: 'purple' 
  },
  { 
    id: 4, 
    title: 'Produto Mais Vendido', 
    value: 'Camiseta Básica', 
    icon: Package, 
    change: '48 unidades', 
    status: 'neutral',
    color: 'orange' 
  },
]

// Cores para os gráficos
const COLORS = ['#4f46e5', '#06b6d4', '#10b981', '#f59e0b', '#ef4444']

export default function ReportsPage() {
  const [period, setPeriod] = useState('7dias')

  return (
    <div className="p-6 space-y-6 dark:bg-gray-900">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold dark:text-white">Relatórios</h1>
        <div className="flex items-center space-x-2">
          <Calendar size={18} className="text-gray-400" />
          <select
            className="block w-full py-2 pl-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="7dias">Últimos 7 dias</option>
            <option value="30dias">Últimos 30 dias</option>
            <option value="90dias">Últimos 90 dias</option>
            <option value="12meses">Últimos 12 meses</option>
          </select>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat) => (
          <div key={stat.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</h2>
                <p className="text-2xl font-bold mt-1 dark:text-white">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900`}>
                <stat.icon 
                  size={20} 
                  className={`text-${stat.color}-600 dark:text-${stat.color}-400`} 
                />
              </div>
            </div>
            <div className={`mt-4 text-sm ${
              stat.status === 'up' ? 'text-green-600 dark:text-green-400' : 
              stat.status === 'down' ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'
            }`}>
              {stat.change} {stat.status === 'up' && 'desde o período anterior'}
            </div>
          </div>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de vendas */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4 dark:text-white">Vendas do Período</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={salesData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  formatter={(value) => [`R$ ${typeof value === 'number' ? value.toFixed(2) : value}`, 'Vendas']}
                  contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F9FAFB' }}
                  labelStyle={{ color: '#F9FAFB' }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="vendas"
                  stroke="#4f46e5"
                  activeDot={{ r: 8 }}
                  name="Vendas (R$)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Gráfico de formas de pagamento */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4 dark:text-white">Formas de Pagamento</h2>
          <div className="h-64 flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentMethodData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {paymentMethodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${typeof value === 'number' ? value.toFixed(0) : value}%`, 'Percentual']}
                  contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F9FAFB' }}
                  labelStyle={{ color: '#F9FAFB' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Top Produtos */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4 dark:text-white">Produtos Mais Vendidos</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topProductsData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9CA3AF" />
                <YAxis dataKey="name" type="category" width={100} stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F9FAFB' }}
                  labelStyle={{ color: '#F9FAFB' }}
                />
                <Legend />
                <Bar dataKey="vendas" fill="#10b981" name="Unidades Vendidas" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Outros gráficos e análises podem ser adicionados aqui */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4 dark:text-white">Categorias de Produtos</h2>
          <div className="h-64 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Gráfico de categorias (em desenvolvimento)</p>
          </div>
        </div>
      </div>

      {/* Seção para período mais longo */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b dark:border-gray-700">
          <h2 className="text-lg font-medium dark:text-white">Análise Mensal (2023)</h2>
        </div>
        <div className="p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: 'Jan', vendas: 25400 },
                  { name: 'Fev', vendas: 28300 },
                  { name: 'Mar', vendas: 32100 },
                  { name: 'Abr', vendas: 35800 },
                  { name: 'Mai', vendas: 45780 },
                ]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  formatter={(value) => [`R$ ${typeof value === 'number' ? value.toFixed(2) : value}`, 'Vendas']}
                  contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F9FAFB' }}
                  labelStyle={{ color: '#F9FAFB' }}
                />
                <Legend />
                <Bar dataKey="vendas" fill="#4f46e5" name="Vendas (R$)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
} 