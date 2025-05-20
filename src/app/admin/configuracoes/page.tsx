"use client"

import { useState } from 'react'
import { Save, Mail, BellRing, Shield, CreditCard, Database, AlertTriangle } from 'lucide-react'

// Dados simulados das configurações
const mockSettings = {
  // Notificações
  emailNotifications: {
    newSubscription: true,
    cancelledSubscription: true,
    paymentFailed: true,
    paymentSuccess: false,
    newClient: true
  },
  
  // E-mail
  emailSettings: {
    smtpServer: 'smtp.example.com',
    smtpPort: 587,
    smtpUser: 'notificacoes@afconsultoria.com.br',
    smtpPassword: '********',
    senderName: 'AF Consultoria',
    senderEmail: 'notificacoes@afconsultoria.com.br'
  },
  
  // Pagamento
  paymentSettings: {
    enableStripe: true,
    enablePayPal: false,
    enablePix: true,
    testMode: true,
    stripePublicKey: 'pk_test_*****',
    stripeSecretKey: 'sk_test_*****',
    pixKey: 'chave-pix-exemplo@exemplo.com'
  },
  
  // Segurança
  securitySettings: {
    enableTwoFactor: false,
    requireStrongPasswords: true,
    sessionTimeout: 30, // em minutos
    maxLoginAttempts: 5
  }
}

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('notifications')
  const [settings, setSettings] = useState(mockSettings)
  const [saving, setSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  
  // Função para atualizar configurações
  const updateSettings = (category: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [field]: value
      }
    }))
  }
  
  // Função para salvar configurações
  const handleSave = async () => {
    setSaving(true)
    setSuccessMessage('')
    
    try {
      // Em uma implementação real, aqui faríamos uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mostrar mensagem de sucesso
      setSuccessMessage('Configurações salvas com sucesso!')
      
      // Esconder a mensagem após 3 segundos
      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
    } catch (error) {
      console.error('Erro ao salvar configurações:', error)
    } finally {
      setSaving(false)
    }
  }
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Configurações</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-1 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md disabled:opacity-50"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              <span>Salvando...</span>
            </>
          ) : (
            <>
              <Save size={18} className="mr-2" />
              <span>Salvar Alterações</span>
            </>
          )}
        </button>
      </div>
      
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {successMessage}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow">
        {/* Abas de configuração */}
        <div className="border-b">
          <div className="flex overflow-x-auto">
            <button
              className={`px-4 py-3 font-medium border-b-2 ${
                activeTab === 'notifications' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('notifications')}
            >
              <div className="flex items-center">
                <BellRing size={18} className="mr-2" />
                <span>Notificações</span>
              </div>
            </button>
            
            <button
              className={`px-4 py-3 font-medium border-b-2 ${
                activeTab === 'email' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('email')}
            >
              <div className="flex items-center">
                <Mail size={18} className="mr-2" />
                <span>E-mail</span>
              </div>
            </button>
            
            <button
              className={`px-4 py-3 font-medium border-b-2 ${
                activeTab === 'payment' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('payment')}
            >
              <div className="flex items-center">
                <CreditCard size={18} className="mr-2" />
                <span>Pagamento</span>
              </div>
            </button>
            
            <button
              className={`px-4 py-3 font-medium border-b-2 ${
                activeTab === 'security' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('security')}
            >
              <div className="flex items-center">
                <Shield size={18} className="mr-2" />
                <span>Segurança</span>
              </div>
            </button>
            
            <button
              className={`px-4 py-3 font-medium border-b-2 ${
                activeTab === 'database' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('database')}
            >
              <div className="flex items-center">
                <Database size={18} className="mr-2" />
                <span>Banco de Dados</span>
              </div>
            </button>
          </div>
        </div>
        
        {/* Conteúdo das abas */}
        <div className="p-6">
          {/* Notificações */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium mb-4">Configurações de Notificações</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Nova assinatura</label>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      id="newSubscription"
                      checked={settings.emailNotifications.newSubscription}
                      onChange={(e) => updateSettings('emailNotifications', 'newSubscription', e.target.checked)}
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer transition-transform duration-200 ease-in"
                    />
                    <label
                      htmlFor="newSubscription"
                      className={`toggle-label block overflow-hidden h-6 rounded-full ${
                        settings.emailNotifications.newSubscription ? 'bg-primary' : 'bg-gray-300'
                      } cursor-pointer`}
                    ></label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Assinatura cancelada</label>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      id="cancelledSubscription"
                      checked={settings.emailNotifications.cancelledSubscription}
                      onChange={(e) => updateSettings('emailNotifications', 'cancelledSubscription', e.target.checked)}
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer transition-transform duration-200 ease-in"
                    />
                    <label
                      htmlFor="cancelledSubscription"
                      className={`toggle-label block overflow-hidden h-6 rounded-full ${
                        settings.emailNotifications.cancelledSubscription ? 'bg-primary' : 'bg-gray-300'
                      } cursor-pointer`}
                    ></label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Falha no pagamento</label>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      id="paymentFailed"
                      checked={settings.emailNotifications.paymentFailed}
                      onChange={(e) => updateSettings('emailNotifications', 'paymentFailed', e.target.checked)}
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer transition-transform duration-200 ease-in"
                    />
                    <label
                      htmlFor="paymentFailed"
                      className={`toggle-label block overflow-hidden h-6 rounded-full ${
                        settings.emailNotifications.paymentFailed ? 'bg-primary' : 'bg-gray-300'
                      } cursor-pointer`}
                    ></label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Pagamento bem-sucedido</label>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      id="paymentSuccess"
                      checked={settings.emailNotifications.paymentSuccess}
                      onChange={(e) => updateSettings('emailNotifications', 'paymentSuccess', e.target.checked)}
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer transition-transform duration-200 ease-in"
                    />
                    <label
                      htmlFor="paymentSuccess"
                      className={`toggle-label block overflow-hidden h-6 rounded-full ${
                        settings.emailNotifications.paymentSuccess ? 'bg-primary' : 'bg-gray-300'
                      } cursor-pointer`}
                    ></label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Novo cliente</label>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      id="newClient"
                      checked={settings.emailNotifications.newClient}
                      onChange={(e) => updateSettings('emailNotifications', 'newClient', e.target.checked)}
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer transition-transform duration-200 ease-in"
                    />
                    <label
                      htmlFor="newClient"
                      className={`toggle-label block overflow-hidden h-6 rounded-full ${
                        settings.emailNotifications.newClient ? 'bg-primary' : 'bg-gray-300'
                      } cursor-pointer`}
                    ></label>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* E-mail */}
          {activeTab === 'email' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium mb-4">Configurações de E-mail</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Servidor SMTP
                  </label>
                  <input
                    type="text"
                    value={settings.emailSettings.smtpServer}
                    onChange={(e) => updateSettings('emailSettings', 'smtpServer', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Porta SMTP
                  </label>
                  <input
                    type="number"
                    value={settings.emailSettings.smtpPort}
                    onChange={(e) => updateSettings('emailSettings', 'smtpPort', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Usuário SMTP
                  </label>
                  <input
                    type="text"
                    value={settings.emailSettings.smtpUser}
                    onChange={(e) => updateSettings('emailSettings', 'smtpUser', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Senha SMTP
                  </label>
                  <input
                    type="password"
                    value={settings.emailSettings.smtpPassword}
                    onChange={(e) => updateSettings('emailSettings', 'smtpPassword', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome do Remetente
                  </label>
                  <input
                    type="text"
                    value={settings.emailSettings.senderName}
                    onChange={(e) => updateSettings('emailSettings', 'senderName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    E-mail do Remetente
                  </label>
                  <input
                    type="email"
                    value={settings.emailSettings.senderEmail}
                    onChange={(e) => updateSettings('emailSettings', 'senderEmail', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md">
                  Testar Configurações
                </button>
              </div>
            </div>
          )}
          
          {/* Pagamento */}
          {activeTab === 'payment' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium mb-4">Configurações de Pagamento</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Modo de Teste</label>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      id="testMode"
                      checked={settings.paymentSettings.testMode}
                      onChange={(e) => updateSettings('paymentSettings', 'testMode', e.target.checked)}
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer transition-transform duration-200 ease-in"
                    />
                    <label
                      htmlFor="testMode"
                      className={`toggle-label block overflow-hidden h-6 rounded-full ${
                        settings.paymentSettings.testMode ? 'bg-primary' : 'bg-gray-300'
                      } cursor-pointer`}
                    ></label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Habilitar Stripe</label>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      id="enableStripe"
                      checked={settings.paymentSettings.enableStripe}
                      onChange={(e) => updateSettings('paymentSettings', 'enableStripe', e.target.checked)}
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer transition-transform duration-200 ease-in"
                    />
                    <label
                      htmlFor="enableStripe"
                      className={`toggle-label block overflow-hidden h-6 rounded-full ${
                        settings.paymentSettings.enableStripe ? 'bg-primary' : 'bg-gray-300'
                      } cursor-pointer`}
                    ></label>
                  </div>
                </div>
                
                {settings.paymentSettings.enableStripe && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 pt-2 border-l-2 border-gray-200">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Chave Pública do Stripe
                      </label>
                      <input
                        type="text"
                        value={settings.paymentSettings.stripePublicKey}
                        onChange={(e) => updateSettings('paymentSettings', 'stripePublicKey', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Chave Secreta do Stripe
                      </label>
                      <input
                        type="password"
                        value={settings.paymentSettings.stripeSecretKey}
                        onChange={(e) => updateSettings('paymentSettings', 'stripeSecretKey', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                      />
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Habilitar PayPal</label>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      id="enablePayPal"
                      checked={settings.paymentSettings.enablePayPal}
                      onChange={(e) => updateSettings('paymentSettings', 'enablePayPal', e.target.checked)}
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer transition-transform duration-200 ease-in"
                    />
                    <label
                      htmlFor="enablePayPal"
                      className={`toggle-label block overflow-hidden h-6 rounded-full ${
                        settings.paymentSettings.enablePayPal ? 'bg-primary' : 'bg-gray-300'
                      } cursor-pointer`}
                    ></label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Habilitar PIX</label>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      id="enablePix"
                      checked={settings.paymentSettings.enablePix}
                      onChange={(e) => updateSettings('paymentSettings', 'enablePix', e.target.checked)}
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer transition-transform duration-200 ease-in"
                    />
                    <label
                      htmlFor="enablePix"
                      className={`toggle-label block overflow-hidden h-6 rounded-full ${
                        settings.paymentSettings.enablePix ? 'bg-primary' : 'bg-gray-300'
                      } cursor-pointer`}
                    ></label>
                  </div>
                </div>
                
                {settings.paymentSettings.enablePix && (
                  <div className="pl-4 pt-2 border-l-2 border-gray-200">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Chave PIX
                      </label>
                      <input
                        type="text"
                        value={settings.paymentSettings.pixKey}
                        onChange={(e) => updateSettings('paymentSettings', 'pixKey', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Segurança */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium mb-4">Configurações de Segurança</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Autenticação de dois fatores</label>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      id="enableTwoFactor"
                      checked={settings.securitySettings.enableTwoFactor}
                      onChange={(e) => updateSettings('securitySettings', 'enableTwoFactor', e.target.checked)}
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer transition-transform duration-200 ease-in"
                    />
                    <label
                      htmlFor="enableTwoFactor"
                      className={`toggle-label block overflow-hidden h-6 rounded-full ${
                        settings.securitySettings.enableTwoFactor ? 'bg-primary' : 'bg-gray-300'
                      } cursor-pointer`}
                    ></label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Exigir senhas fortes</label>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      id="requireStrongPasswords"
                      checked={settings.securitySettings.requireStrongPasswords}
                      onChange={(e) => updateSettings('securitySettings', 'requireStrongPasswords', e.target.checked)}
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer transition-transform duration-200 ease-in"
                    />
                    <label
                      htmlFor="requireStrongPasswords"
                      className={`toggle-label block overflow-hidden h-6 rounded-full ${
                        settings.securitySettings.requireStrongPasswords ? 'bg-primary' : 'bg-gray-300'
                      } cursor-pointer`}
                    ></label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tempo limite da sessão (minutos)
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="120"
                    value={settings.securitySettings.sessionTimeout}
                    onChange={(e) => updateSettings('securitySettings', 'sessionTimeout', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número máximo de tentativas de login
                  </label>
                  <input
                    type="number"
                    min="3"
                    max="10"
                    value={settings.securitySettings.maxLoginAttempts}
                    onChange={(e) => updateSettings('securitySettings', 'maxLoginAttempts', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Banco de Dados */}
          {activeTab === 'database' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium mb-4">Configurações de Banco de Dados</h2>
              
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 text-amber-700">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm">
                      Esta seção está disponível apenas para administradores técnicos.
                      As alterações aqui podem afetar o funcionamento do sistema.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 space-y-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
                  Executar Backup do Banco de Dados
                </button>
                
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md">
                  Exportar Dados de Clientes
                </button>
                
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md">
                  Visualizar Logs do Sistema
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 