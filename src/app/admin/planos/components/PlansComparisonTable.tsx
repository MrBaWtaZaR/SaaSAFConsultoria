"use client"

import { Check, X } from 'lucide-react'

interface PlanFeature {
  name: string;
  basic: boolean;
  premium: boolean;
  enterprise: boolean;
}

interface PlanComparisonProps {
  plans: any[];
}

export default function PlansComparisonTable({ plans }: PlanComparisonProps) {
  // Encontrar os planos pelas IDs
  const basicPlan = plans.find(p => p.name === 'Básico') || null;
  const premiumPlan = plans.find(p => p.name === 'Premium') || null;
  const enterprisePlan = plans.find(p => p.name === 'Enterprise') || null;
  
  // Formatação de valores
  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2)}`;
  };
  
  // Criar lista unificada de features para comparação
  const getComparisonFeatures = (): PlanFeature[] => {
    const allFeatures = new Set<string>();
    
    // Coletar todas as features únicas
    plans.forEach(plan => {
      plan.features.forEach((feature: string) => {
        allFeatures.add(feature);
      });
    });
    
    // Criar objetos de comparação para cada feature
    return Array.from(allFeatures).map(feature => ({
      name: feature,
      basic: basicPlan?.features.includes(feature) || false,
      premium: premiumPlan?.features.includes(feature) || false,
      enterprise: enterprisePlan?.features.includes(feature) || false
    }));
  };
  
  const comparisonFeatures = getComparisonFeatures();
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b dark:border-gray-700">
        <h2 className="text-lg font-medium dark:text-white">Comparação de Planos</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Visão comparativa de todos os planos disponíveis</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/4">
                Recursos
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {basicPlan?.name || 'Básico'}
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {premiumPlan?.name || 'Premium'}
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {enterprisePlan?.name || 'Enterprise'}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {/* Preços */}
            <tr className="bg-gray-50 dark:bg-gray-700">
              <td className="px-6 py-3 text-sm font-medium text-gray-900 dark:text-white">
                Preço Mensal
              </td>
              <td className="px-6 py-3 text-center font-medium text-primary">
                {basicPlan ? formatCurrency(basicPlan.price) : '-'}
              </td>
              <td className="px-6 py-3 text-center font-medium text-primary">
                {premiumPlan ? formatCurrency(premiumPlan.price) : '-'}
              </td>
              <td className="px-6 py-3 text-center font-medium text-primary">
                {enterprisePlan ? formatCurrency(enterprisePlan.price) : '-'}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-3 text-sm font-medium text-gray-900 dark:text-white">
                Preço Anual
              </td>
              <td className="px-6 py-3 text-center text-gray-700 dark:text-gray-300">
                {basicPlan ? formatCurrency(basicPlan.priceYearly) : '-'}
              </td>
              <td className="px-6 py-3 text-center text-gray-700 dark:text-gray-300">
                {premiumPlan ? formatCurrency(premiumPlan.priceYearly) : '-'}
              </td>
              <td className="px-6 py-3 text-center text-gray-700 dark:text-gray-300">
                {enterprisePlan ? formatCurrency(enterprisePlan.priceYearly) : '-'}
              </td>
            </tr>
            
            {/* Limites */}
            <tr className="bg-gray-50 dark:bg-gray-700">
              <td className="px-6 py-3 text-sm font-medium text-gray-900 dark:text-white">
                Limite de Produtos
              </td>
              <td className="px-6 py-3 text-center text-gray-700 dark:text-gray-300">
                {basicPlan ? basicPlan.productLimit : '-'}
              </td>
              <td className="px-6 py-3 text-center text-gray-700 dark:text-gray-300">
                {premiumPlan ? premiumPlan.productLimit : '-'}
              </td>
              <td className="px-6 py-3 text-center text-gray-700 dark:text-gray-300">
                {enterprisePlan ? enterprisePlan.productLimit : '-'}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-3 text-sm font-medium text-gray-900 dark:text-white">
                Limite de Clientes
              </td>
              <td className="px-6 py-3 text-center text-gray-700 dark:text-gray-300">
                {basicPlan ? basicPlan.clientLimit : '-'}
              </td>
              <td className="px-6 py-3 text-center text-gray-700 dark:text-gray-300">
                {premiumPlan ? premiumPlan.clientLimit : '-'}
              </td>
              <td className="px-6 py-3 text-center text-gray-700 dark:text-gray-300">
                {enterprisePlan ? enterprisePlan.clientLimit : '-'}
              </td>
            </tr>
            
            {/* Features */}
            {comparisonFeatures.map((feature, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : ''}>
                <td className="px-6 py-3 text-sm font-medium text-gray-900 dark:text-white">
                  {feature.name}
                </td>
                <td className="px-6 py-3 text-center">
                  {feature.basic ? (
                    <div className="flex justify-center">
                      <Check size={18} className="text-green-500" />
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <X size={18} className="text-gray-300 dark:text-gray-600" />
                    </div>
                  )}
                </td>
                <td className="px-6 py-3 text-center">
                  {feature.premium ? (
                    <div className="flex justify-center">
                      <Check size={18} className="text-green-500" />
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <X size={18} className="text-gray-300 dark:text-gray-600" />
                    </div>
                  )}
                </td>
                <td className="px-6 py-3 text-center">
                  {feature.enterprise ? (
                    <div className="flex justify-center">
                      <Check size={18} className="text-green-500" />
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <X size={18} className="text-gray-300 dark:text-gray-600" />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 