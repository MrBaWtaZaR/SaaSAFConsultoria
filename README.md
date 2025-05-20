# AF Consultoria e Assessoria

Sistema de gestão completo para pequenos lojistas de roupas femininas e masculinas.

## 📋 Sobre o Projeto

AF Consultoria e Assessoria é um SaaS (Software como Serviço) desenvolvido para atender as necessidades de pequenos lojistas do setor de moda, oferecendo ferramentas completas para gestão de estoque, cadastro de clientes, vendas e relatórios.

### 🌟 Principais Funcionalidades

- **Gestão de Produtos**: Cadastro completo com tamanhos, cores, preços e estoque
- **Cadastro de Clientes**: Gerenciamento de clientes, incluindo lojistas, revendedores e excursões
- **PDV Simplificado**: Sistema de vendas intuitivo com desconto e diferentes formas de pagamento
- **Relatórios e Mostruários**: Geração de relatórios de vendas e mostruários em PDF
- **Gestão de Assinaturas**: Planos com diferentes limites e funcionalidades
- **Painel Administrativo**: Controle de usuários, planos e conteúdo do site

## 🚀 Tecnologias Utilizadas

- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: Next.js API Routes
- **Banco de Dados**: PostgreSQL com Prisma ORM
- **Autenticação**: NextAuth.js
- **UI Components**: Componentes customizados baseados em Radix UI

## 🛠️ Estrutura do Projeto

```
af-consultoria/
├── prisma/                # Modelos e configurações do banco de dados
├── public/                # Arquivos estáticos (imagens, ícones)
├── src/
│   ├── app/               # Diretórios da aplicação Next.js App Router
│   │   ├── auth/          # Páginas de autenticação
│   │   ├── dashboard/     # Área do usuário logado
│   │   ├── landing/       # Landing page
│   │   ├── planos/        # Páginas de planos e assinaturas
│   │   ├── admin/         # Painel administrativo
│   │   └── api/           # Rotas de API
│   ├── components/        # Componentes reutilizáveis
│   ├── lib/               # Utilitários e funções auxiliares
│   └── utils/             # Funções utilitárias
```

## 🏁 Começando

### Pré-requisitos

- Node.js (versão 18 ou superior)
- PostgreSQL
- npm ou yarn

### Instalação

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/af-consultoria.git
cd af-consultoria
```

2. Instale as dependências
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/af_consultoria?schema=public"
NEXTAUTH_SECRET="sua-chave-secreta"
NEXTAUTH_URL="http://localhost:3000"
```

4. Execute as migrações do banco de dados
```bash
npx prisma migrate dev
```

5. Inicie o servidor de desenvolvimento
```bash
npm run dev
# ou
yarn dev
```

6. Acesse http://localhost:3000 no seu navegador

## 📊 Módulos Principais

### Dashboard

O dashboard apresenta uma visão geral com os principais indicadores do negócio:
- Total de produtos
- Vendas do mês
- Total de clientes
- Produtos com baixo estoque
- Gráficos de desempenho
- Vendas recentes

### Produtos

Gerenciamento completo de produtos:
- Listagem com busca e filtros
- Cadastro com opções de tamanhos, cores e categorias
- Gestão de estoque
- Upload de imagens

### Clientes

Gestão de clientes segmentada:
- Cadastro de diferentes tipos de clientes
- Histórico de compras
- Busca e filtros avançados

### Vendas (PDV)

Sistema simplificado de ponto de venda:
- Seleção de cliente
- Adição de produtos ao carrinho
- Aplicação de descontos
- Seleção de forma de pagamento
- Emissão de comprovante

### Relatórios

Relatórios de desempenho:
- Vendas por período
- Produtos mais vendidos
- Clientes mais ativos
- Estoque atual
- Mostruários em PDF para apresentação

## 💰 Planos e Assinaturas

- **Teste Grátis**: 7 dias, limite de 10 produtos e 5 clientes
- **Básico**: R$ 49,90/mês, limite de 100 produtos e 50 clientes
- **Profissional**: R$ 89,90/mês, produtos e clientes ilimitados

## 🔮 Futuras Implementações

- Emissão de NF-e e integração com Sefaz
- Integração com Correios ou transportadoras
- App mobile (PWA ou nativo)
- Integração com WhatsApp Business API

## ⚖️ Licença

Este projeto está sob a licença [MIT](LICENSE). 