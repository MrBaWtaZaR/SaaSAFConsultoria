"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validação básica
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem')
      setLoading(false)
      return
    }

    try {
      // Este é apenas um stub mockado para simular o registro
      // Em uma implementação real, aqui chamaríamos a API para registrar o usuário
      setTimeout(() => {
        // Simular sucesso após 1 segundo
        setLoading(false)
        router.push('/auth/login?registered=true')
      }, 1000)
    } catch (err) {
      setError('Erro ao registrar. Tente novamente.')
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 m-auto bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-8">
          <h1 className="text-2xl font-bold text-center text-primary">
            AF Consultoria e Assessoria
          </h1>
        </div>
        
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Crie sua conta
        </h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="name" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nome completo
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Seu nome completo"
            />
          </div>
          
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="seu@email.com"
            />
          </div>
          
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Mínimo 8 caracteres"
              minLength={8}
            />
          </div>
          
          <div>
            <label 
              htmlFor="confirmPassword" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirme sua senha
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Digite a senha novamente"
              minLength={8}
            />
          </div>
          
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
                ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Registrando...' : 'Registrar-se'}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Já tem uma conta?{' '}
            <Link href="/auth/login" className="text-primary hover:underline">
              Entrar
            </Link>
          </p>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
          Ao se registrar, você concorda com nossos{' '}
          <a href="#" className="text-primary hover:underline">
            Termos de Serviço
          </a>{' '}
          e{' '}
          <a href="#" className="text-primary hover:underline">
            Política de Privacidade
          </a>
        </div>
      </div>
    </div>
  )
} 