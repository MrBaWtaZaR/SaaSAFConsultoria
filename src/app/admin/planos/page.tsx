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
    <div className="p-6 space-y-6">
      <div className="flex items-center mb-6">
        <Link 
          href="/admin" 
          className="flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} className="mr-1" /> Voltar para Dashboard
        </Link>
      </div>
      
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gerenciamento de Planos</h1>
        <button 
          onClick={handleCreatePlan}
          className="flex items-center gap-1 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md"
        >
          <Plus size={16} />
          <span>Novo Plano</span>
        </button>
      </div>
      
      {/* Tabs de navegação */}
      <div className="flex border-b border-gray-200">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'list'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('list')}
        >
          Lista de Planos
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'comparison'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('comparison')}
        >
          Comparar Planos
        </button>
      </div>
      
      {activeTab === 'list' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-medium">Planos Disponíveis</h2>
            <p className="text-sm text-gray-500 mt-1">Configure os planos, preços e funcionalidades oferecidas aos clientes</p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {plans.map(plan => (
              <div key={plan.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
                      {plan.isActive ? (
                        <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          Ativo
                        </span>
                      ) : (
                        <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                          Inativo
                        </span>
                      )}
                      {!plan.isPublic && (
                        <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                          Privado
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 mb-2">{plan.description}</p>
                    <div className="flex items-center text-gray-700 space-x-4">
                      <span className="text-lg font-bold text-primary">{formatCurrency(plan.price)}/mês</span>
                      <span className="text-sm text-gray-500">ou {formatCurrency(plan.priceYearly)}/ano</span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      <span className="mr-4">{plan.usersCount} clientes ativos</span>
                      <span className="mr-4">Máx. {plan.productLimit} produtos</span>
                      <span>Máx. {plan.clientLimit} clientes</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => togglePlanExpand(plan.id)}
                      className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      {expandedPlan === plan.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    <button 
                      onClick={() => handleEditPlan(plan)}
                      className="p-2 text-blue-500 hover:text-blue-700 focus:outline-none"
                    >
                      <Edit size={20} />
                    </button>
                    {plan.usersCount === 0 && (
                      <button 
                        onClick={() => handleDeletePlan(plan.id)}
                        className="p-2 text-red-500 hover:text-red-700 focus:outline-none"
                      >
                        <Trash size={20} />
                      </button>
                    )}
                  </div>
                </div>
                
                {expandedPlan === plan.id && (
                  <div className="mt-4 border-t pt-4">
                    <h4 className="font-medium mb-2">Recursos inclusos:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check size={16} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
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
      
      {/* Tabela de comparação */}
      {activeTab === 'comparison' && (
        <PlansComparisonTable plans={plans} />
      )}
      
      {/* Modal de Edição/Criação de Plano */}
      {editingPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">{isCreating ? 'Criar Novo Plano' : 'Editar Plano'}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome do Plano
                  </label>
                  <input
                    type="text"
                    value={editingPlan.name}
                    onChange={(e) => setEditingPlan({...editingPlan, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="Ex: Plano Premium"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status do Plano
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editingPlan.isActive}
                        onChange={(e) => setEditingPlan({...editingPlan, isActive: e.target.checked})}
                        className="rounded text-primary focus:ring-primary h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-gray-700">Ativo</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editingPlan.isPublic}
                        onChange={(e) => setEditingPlan({...editingPlan, isPublic: e.target.checked})}
                        className="rounded text-primary focus:ring-primary h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-gray-700">Público</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <textarea
                  value={editingPlan.description}
                  onChange={(e) => setEditingPlan({...editingPlan, description: e.target.value})}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Descreva o plano brevemente"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preço Mensal (R$)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={editingPlan.price}
                    onChange={(e) => setEditingPlan({...editingPlan, price: parseFloat(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preço Anual (R$)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={editingPlan.priceYearly}
                    onChange={(e) => setEditingPlan({...editingPlan, priceYearly: parseFloat(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Limite de Produtos
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={editingPlan.productLimit}
                    onChange={(e) => setEditingPlan({...editingPlan, productLimit: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Limite de Clientes
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={editingPlan.clientLimit}
                    onChange={(e) => setEditingPlan({...editingPlan, clientLimit: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recursos Inclusos
                </label>
                <div className="space-y-2">
                  {editingPlan.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => {
                          const updatedFeatures = [...editingPlan.features];
                          updatedFeatures[index] = e.target.value;
                          setEditingPlan({...editingPlan, features: updatedFeatures});
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(index)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                  
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={editingPlan.newFeature}
                      onChange={(e) => setEditingPlan({...editingPlan, newFeature: e.target.value})}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                      placeholder="Adicionar novo recurso"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
                    />
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="ml-2 text-primary hover:text-primary/80"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t bg-gray-50 flex justify-end space-x-3">
              <button
                onClick={() => setEditingPlan(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleSavePlan}
                className="flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                <Save size={16} />
                <span>Salvar Plano</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 