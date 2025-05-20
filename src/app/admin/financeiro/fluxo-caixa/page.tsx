"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminFluxoCaixaRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Redireciona para a página dashboard/financeiro/fluxo-caixa
    router.replace('/dashboard/financeiro/fluxo-caixa')
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Redirecionando...</h2>
        <p className="text-gray-500">Aguarde um momento por favor.</p>
        <div className="mt-4">
          <div className="w-12 h-12 border-4 border-t-primary border-gray-200 rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    </div>
  )
} 