"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash, Check, X, Package, ChevronDown, ChevronUp, Save, ArrowLeft } from 'lucide-react'
import PlansComparisonTable from './components/PlansComparisonTable'

// Dados mockados de planos
const initialPlans = [
  {
    id: '1',
    name: 'Básico',
    description: 'Ideal para pequenas lojas iniciando no mercado',
    price: 89.90,
    priceYearly: 863.00,
    productLimit: 100,
    clientLimit: 50,
    features: [
      'Até 100 produtos',
      'Até 50 clientes',
      'Gestão de vendas básica',
      'Relatórios simples',
      'Suporte por email'
    ],
    isActive: true,
    isPublic: true,
    usersCount: 26
  },
  {
    id: '2',
    name: 'Premium',
    description: 'Para lojas em crescimento com necessidades avançadas',
    price: 149.90,
    priceYearly: 1439.00,
    productLimit: 500,
    clientLimit: 200,
    features: [
      'Até 500 produtos',
      'Até 200 clientes',
      'Gestão de vendas avançada',
      'Relatórios detalhados',
      'Controle de estoque',
      'Integração com marketplaces',
      'Suporte prioritário'
    ],
    isActive: true,
    isPublic: true,
    usersCount: 14
  },
  {
    id: '3',
    name: 'Enterprise',
    description: 'Solução completa para lojas estabelecidas',
    price: 249.90,
    priceYearly: 2399.00,
    productLimit: 2000,
    clientLimit: 1000,
    features: [
      'Até 2000 produtos',
      'Até 1000 clientes',
      'Gestão de vendas completa',
      'Dashboard analítico',
      'Gestão de estoque avançada',
      'Múltiplos usuários',
      'API de integração',
      'Suporte 24/7',
      'Backup diário'
    ],
    isActive: true,
    isPublic: true,
    usersCount: 7
  }
];

export default function PlansPage() {
  const [plans, setPlans] = useState(initialPlans);
  const [editingPlan, setEditingPlan] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'list' | 'comparison'>('list');
  
  // Formatar valores monetários
  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2)}`;
  };
  
  // Expandir/colapsar detalhes do plano
  const togglePlanExpand = (planId: string) => {
    if (expandedPlan === planId) {
      setExpandedPlan(null);
    } else {
      setExpandedPlan(planId);
    }
  };
  
  // Iniciar edição de plano
  const handleEditPlan = (plan: any) => {
    setEditingPlan({...plan, newFeature: ''});
    setIsCreating(false);
  };
  
  // Iniciar criação de novo plano
  const handleCreatePlan = () => {
    setEditingPlan({
      id: `new-${Date.now()}`,
      name: 'Novo Plano',
      description: 'Descrição do novo plano',
      price: 0,
      priceYearly: 0,
      productLimit: 100,
      clientLimit: 50,
      features: ['Recurso 1', 'Recurso 2'],
      isActive: true,
      isPublic: true,
      usersCount: 0,
      newFeature: ''
    });
    setIsCreating(true);
  };
  
  // Salvar alterações no plano
  const handleSavePlan = () => {
    if (isCreating) {
      // Adicionar novo plano
      setPlans([...plans, {...editingPlan, newFeature: undefined}]);
    } else {
      // Atualizar plano existente
      setPlans(plans.map(plan => 
        plan.id === editingPlan.id ? {...editingPlan, newFeature: undefined} : plan
      ));
    }
    setEditingPlan(null);
  };
  
  // Excluir plano
  const handleDeletePlan = (planId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este plano?')) {
      setPlans(plans.filter(plan => plan.id !== planId));
    }
  };
  
  // Adicionar nova feature ao plano em edição
  const handleAddFeature = () => {
    if (editingPlan.newFeature.trim()) {
      setEditingPlan({
        ...editingPlan,
        features: [...editingPlan.features, editingPlan.newFeature.trim()],
        newFeature: ''
      });
    }
  };
  
  // Remover feature do plano em edição
  const handleRemoveFeature = (index: number) => {
    setEditingPlan({
      ...editingPlan,
      features: editingPlan.features.filter((_: any, i: number) => i !== index)
    });
  };
  
  return (
    <div className="p-6 space-y-6 dark:bg-gray-900">
      <div className="flex items-center mb-6">
        <Link 
          href="/admin" 
          className="flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <ArrowLeft size={16} className="mr-1" /> Voltar para Dashboard
        </Link>
      </div>
      
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold dark:text-white">Gerenciamento de Planos</h1>
        <button 
          onClick={handleCreatePlan}
          className="flex items-center gap-1 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md"
        >
          <Plus size={16} />
          <span>Novo Plano</span>
        </button>
      </div>
      
      {/* Tabs de navegação */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'list'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('list')}
        >
          Lista de Planos
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'comparison'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('comparison')}
        >
          Comparar Planos
        </button>
      </div>
      
      {activeTab === 'list' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b dark:border-gray-700">
            <h2 className="text-lg font-medium dark:text-white">Planos Disponíveis</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Configure os planos, preços e funcionalidades oferecidas aos clientes</p>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {plans.map(plan => (
              <div key={plan.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{plan.name}</h3>
                      {plan.isActive ? (
                        <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          Ativo
                        </span>
                      ) : (
                        <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          Inativo
                        </span>
                      )}
                      {!plan.isPublic && (
                        <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                          Privado
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 mb-2">{plan.description}</p>
                    <div className="flex items-center text-gray-700 dark:text-gray-300 space-x-4">
                      <span className="text-lg font-bold text-primary">{formatCurrency(plan.price)}/mês</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">ou {formatCurrency(plan.priceYearly)}/ano</span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <span className="mr-4">{plan.usersCount} clientes ativos</span>
                      <span className="mr-4">Máx. {plan.productLimit} produtos</span>
                      <span>Máx. {plan.clientLimit} clientes</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => togglePlanExpand(plan.id)}
                      className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {expandedPlan === plan.id ? 
                        <ChevronUp size={18} className="text-gray-500 dark:text-gray-400" /> : 
                        <ChevronDown size={18} className="text-gray-500 dark:text-gray-400" />
                      }
                    </button>
                    <button 
                      onClick={() => handleEditPlan(plan)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-md dark:text-blue-400 dark:hover:bg-blue-900/20"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => handleDeletePlan(plan.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </div>
                
                {expandedPlan === plan.id && (
                  <div className="mt-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recursos incluídos:</h4>
                    <ul className="space-y-1">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-600 dark:text-gray-400">
                          <Check size={16} className="text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {activeTab === 'comparison' && (
        <PlansComparisonTable plans={plans} />
      )}
      
      {/* Modal de edição de plano */}
      {editingPlan && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl mx-4 overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {isCreating ? 'Criar Novo Plano' : 'Editar Plano'}
              </h2>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nome do Plano
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={editingPlan.name}
                    onChange={(e) => setEditingPlan({...editingPlan, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Descrição
                  </label>
                  <input
                    id="description"
                    type="text"
                    value={editingPlan.description}
                    onChange={(e) => setEditingPlan({...editingPlan, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Preço Mensal (R$)
                  </label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={editingPlan.price}
                    onChange={(e) => setEditingPlan({...editingPlan, price: parseFloat(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="priceYearly" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Preço Anual (R$)
                  </label>
                  <input
                    id="priceYearly"
                    type="number"
                    min="0"
                    step="0.01"
                    value={editingPlan.priceYearly}
                    onChange={(e) => setEditingPlan({...editingPlan, priceYearly: parseFloat(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="productLimit" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Limite de Produtos
                  </label>
                  <input
                    id="productLimit"
                    type="number"
                    min="1"
                    value={editingPlan.productLimit}
                    onChange={(e) => setEditingPlan({...editingPlan, productLimit: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="clientLimit" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Limite de Clientes
                  </label>
                  <input
                    id="clientLimit"
                    type="number"
                    min="1"
                    value={editingPlan.clientLimit}
                    onChange={(e) => setEditingPlan({...editingPlan, clientLimit: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input
                      id="isActive"
                      type="checkbox"
                      checked={editingPlan.isActive}
                      onChange={(e) => setEditingPlan({...editingPlan, isActive: e.target.checked})}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600 rounded"
                    />
                    <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Ativo
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="isPublic"
                      type="checkbox"
                      checked={editingPlan.isPublic}
                      onChange={(e) => setEditingPlan({...editingPlan, isPublic: e.target.checked})}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600 rounded"
                    />
                    <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Público
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Recursos do plano */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recursos do Plano</h3>
                
                <div className="space-y-2">
                  {editingPlan.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => {
                          const newFeatures = [...editingPlan.features];
                          newFeatures[index] = e.target.value;
                          setEditingPlan({...editingPlan, features: newFeatures});
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(index)}
                        className="ml-2 p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  ))}
                  
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={editingPlan.newFeature}
                      onChange={(e) => setEditingPlan({...editingPlan, newFeature: e.target.value})}
                      placeholder="Adicionar novo recurso..."
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
                    />
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="ml-2 p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setEditingPlan(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 rounded-md"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSavePlan}
                className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-md"
              >
                <Save size={16} className="inline-block mr-1" />
                {isCreating ? 'Criar Plano' : 'Salvar Alterações'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 