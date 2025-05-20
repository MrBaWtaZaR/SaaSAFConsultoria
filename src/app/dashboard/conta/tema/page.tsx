"use client"

import { useTheme } from "@/components/theme-provider"
import { Sun, Moon, Monitor } from "lucide-react"

export default function ThemeSettingsPage() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="p-6 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Configurações de Tema</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 max-w-3xl">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">Aparência</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Selecione como você deseja que a interface do sistema seja exibida.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <button
            onClick={() => setTheme("light")}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
              theme === "light" 
                ? "border-primary bg-primary/10"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            <div className="w-16 h-16 bg-white border border-gray-200 rounded-full flex items-center justify-center mb-4">
              <Sun size={32} className="text-amber-500" />
            </div>
            <span className={`font-medium ${theme === "light" ? "text-primary" : "dark:text-white"}`}>
              Claro
            </span>
          </button>
          
          <button
            onClick={() => setTheme("dark")}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
              theme === "dark" 
                ? "border-primary bg-primary/10 dark:bg-primary/20"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            <div className="w-16 h-16 bg-gray-900 border border-gray-700 rounded-full flex items-center justify-center mb-4">
              <Moon size={32} className="text-gray-200" />
            </div>
            <span className={`font-medium ${theme === "dark" ? "text-primary" : "dark:text-white"}`}>
              Escuro
            </span>
          </button>
          
          <button
            onClick={() => setTheme("system")}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
              theme === "system" 
                ? "border-primary bg-primary/10 dark:bg-primary/20"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-white to-gray-900 border border-gray-300 rounded-full flex items-center justify-center mb-4">
              <Monitor size={32} className="text-primary" />
            </div>
            <span className={`font-medium ${theme === "system" ? "text-primary" : "dark:text-white"}`}>
              Sistema
            </span>
          </button>
        </div>
        
        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">Sobre os temas</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
            <li className="flex items-start gap-2">
              <span className="font-bold">Claro:</span> 
              <span>Tema padrão com fundo claro, adequado para uso durante o dia.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">Escuro:</span> 
              <span>Tema com fundo escuro, reduz a fadiga visual e economiza bateria em dispositivos OLED.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">Sistema:</span> 
              <span>Segue automaticamente as configurações do seu sistema operacional.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
} 