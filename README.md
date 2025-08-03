# 📌 ImovelMaps - Backend

Este é o backend do sistema **ImovelMaps**, criado com **Node.js, Express e Sequelize** com banco de dados PostgreSQL.

## ✅ Funcionalidades principais

- Cadastro e login de usuários com JWT
- Sistema de permissões para controle de acesso
- Cadastro de imóveis por imobiliárias
- Integração futura com portais e IA consultora

## ▶️ Como rodar

```bash
# Instale as dependências
npm install

# Configure as variáveis no .env
cp .env.example .env

# Rode as migrations e seeders
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

# Inicie o servidor
npm run dev
