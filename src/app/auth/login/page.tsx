"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

// Credenciais do administrador do SAAS
const ADMIN_CREDENTIALS = {
  email: 'admin@afconsultoria.com',
  password: 'admin123'
}

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const registered = searchParams.get('registered')
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

    try {
      // Verificar se são as credenciais do admin
      if (formData.email === ADMIN_CREDENTIALS.email && formData.password === ADMIN_CREDENTIALS.password) {
        // Armazenar token simulado de admin
        sessionStorage.setItem('admin_token', 'admin-token-123')
        sessionStorage.setItem('admin_name', 'Administrador')
        
        // Verificar se há um URL de redirecionamento armazenado
        const redirectUrl = sessionStorage.getItem('adminRedirectUrl')
        
        // Redirecionar para o URL armazenado ou para o painel administrativo padrão
        setTimeout(() => {
          setLoading(false)
          if (redirectUrl) {
            router.push(redirectUrl)
          } else {
            router.push('/admin')
          }
        }, 1000)
        return
      }
      
      // Se não for admin, este é o fluxo normal do cliente
      // Este é apenas um stub mockado para simular o login
      // Em uma implementação real, aqui chamaríamos a API para autenticar o usuário
      setTimeout(() => {
        // Simular sucesso após 1 segundo
        setLoading(false)
        router.push('/dashboard')
      }, 1000)
    } catch (err) {
      setError('E-mail ou senha incorretos')
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
        
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-2">
          Acesse sua conta
        </h2>
        
        <p className="text-center text-gray-500 text-sm mb-6">
          Sistema unificado para clientes e administradores
        </p>
        
        {registered && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            Registro realizado com sucesso! Faça login para continuar.
          </div>
        )}
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
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
              placeholder="Sua senha"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Lembrar-me
              </label>
            </div>
            
            <div className="text-sm">
              <Link href="/auth/forgot-password" className="text-primary hover:underline">
                Esqueceu a senha?
              </Link>
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
                ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Não tem uma conta?{' '}
            <Link href="/auth/register" className="text-primary hover:underline">
              Registre-se
            </Link>
          </p>
        </div>
        
        <div className="mt-4 pt-4 border-t text-xs text-center text-gray-500">
          Administradores: Use suas credenciais para acessar o painel administrativo
        </div>
      </div>
    </div>
  )
} 