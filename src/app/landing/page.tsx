export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              AF Consultoria e Assessoria
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Gestão inteligente para lojistas de moda
            </p>
            <p className="text-lg max-w-3xl mb-10">
              Sistema completo de gestão para pequenos lojistas de roupas femininas e masculinas,
              com controle de estoque, vendas, mostruários e muito mais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/auth/register"
                className="bg-white text-primary hover:bg-gray-100 font-bold py-3 px-8 rounded-lg shadow-lg transition-all"
              >
                Comece Agora
              </a>
              <a
                href="#planos"
                className="bg-transparent border-2 border-white hover:bg-white/10 py-3 px-8 rounded-lg transition-all"
              >
                Ver Planos
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Tudo o que você precisa para gerenciar seu negócio
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary/10 text-primary flex items-center justify-center rounded-full mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Gestão de Estoque</h3>
              <p className="text-gray-600">
                Controle completo do seu estoque com categorias, tamanhos, cores e imagens dos produtos.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary/10 text-primary flex items-center justify-center rounded-full mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 01-.75.75h-.75m-6-1.5H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">PDV Simplificado</h3>
              <p className="text-gray-600">
                Registre vendas de forma rápida e fácil, com desconto, seleção de cliente e comprovante.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary/10 text-primary flex items-center justify-center rounded-full mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Relatórios e Mostruários</h3>
              <p className="text-gray-600">
                Gere relatórios de vendas e mostruários em PDF para apresentar seus produtos aos clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="planos" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Escolha o plano ideal para o seu negócio
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="border rounded-lg p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-4">Teste Grátis</h3>
              <p className="text-gray-600 mb-6">Experimente por 7 dias sem compromisso</p>
              <div className="text-4xl font-bold mb-6">R$ 0</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Até 10 produtos
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Até 5 clientes
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  PDV básico
                </li>
              </ul>
              <a
                href="/auth/register?plan=free"
                className="block w-full py-3 px-6 text-center bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Começar Gratuitamente
              </a>
            </div>
            
            {/* Básico Plan */}
            <div className="border rounded-lg p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-4">Básico</h3>
              <p className="text-gray-600 mb-6">Para lojistas iniciantes</p>
              <div className="text-4xl font-bold mb-6">R$ 49,90<span className="text-base font-normal">/mês</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Até 100 produtos
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Até 50 clientes
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  PDV completo
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Relatórios básicos
                </li>
              </ul>
              <a
                href="/auth/register?plan=basic"
                className="block w-full py-3 px-6 text-center bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Assinar Plano
              </a>
            </div>
            
            {/* Pro Plan */}
            <div className="border border-primary rounded-lg p-8 shadow-lg relative">
              <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg rounded-tr-lg font-medium">
                Mais Popular
              </div>
              <h3 className="text-2xl font-bold mb-4">Profissional</h3>
              <p className="text-gray-600 mb-6">Para lojistas em crescimento</p>
              <div className="text-4xl font-bold mb-6">R$ 89,90<span className="text-base font-normal">/mês</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Produtos ilimitados
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Clientes ilimitados
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  PDV completo
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Relatórios avançados
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Mostruários PDF ilimitados
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Suporte prioritário
                </li>
              </ul>
              <a
                href="/auth/register?plan=pro"
                className="block w-full py-3 px-6 text-center bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Assinar Plano
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            O que nossos clientes dizem
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">Maria Silva</h4>
                  <p className="text-gray-600 text-sm">Loja de Roupas Femininas</p>
                </div>
              </div>
              <p className="text-gray-700">
                "O sistema da AF Consultoria transformou meu negócio. Agora consigo controlar meu estoque com facilidade e ter visão clara das vendas."
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">João Santos</h4>
                  <p className="text-gray-600 text-sm">Loja de Roupas Masculinas</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Os mostruários em PDF são fantásticos para apresentar produtos para clientes em excursões. Aumentou minhas vendas em 30%!"
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">Ana Oliveira</h4>
                  <p className="text-gray-600 text-sm">Boutique Multimarcas</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Interface super intuitiva e fácil de usar. Mesmo sem experiência com sistemas, me adaptei rapidamente e minha equipe adorou."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para transformar seu negócio?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Comece hoje mesmo com 7 dias de teste gratuito. Sem compromisso.
          </p>
          <a
            href="/auth/register"
            className="inline-block bg-white text-primary hover:bg-gray-100 font-bold py-3 px-8 rounded-lg shadow-lg transition-all"
          >
            Começar Agora
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">AF Consultoria</h3>
              <p className="text-gray-400">
                Gestão inteligente para lojistas de moda desde 2023.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#planos" className="text-gray-400 hover:text-white">Planos</a></li>
                <li><a href="/auth/login" className="text-gray-400 hover:text-white">Login</a></li>
                <li><a href="/auth/register" className="text-gray-400 hover:text-white">Cadastro</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Suporte</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Central de Ajuda</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contato</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Termos de Uso</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Política de Privacidade</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            &copy; {new Date().getFullYear()} AF Consultoria e Assessoria. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
} 