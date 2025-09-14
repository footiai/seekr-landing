# Guia de Implementação Frontend - Seekr API

Este documento fornece um guia simples e objetivo para implementar um frontend que consome todas as funcionalidades da Seekr API.

## 📋 Endpoints da API

### 🔐 Autenticação
- `POST /register` - Criar conta (ganha pacote Starter gratuito)
- `POST /login` - Fazer login (retorna access_token e refresh_token)
- `POST /refresh` - Renovar token
- `POST /logout` - Fazer logout
- `PUT /change-password` - Alterar senha

### 👤 Usuário
- `GET /my-packages` - Ver meus pacotes
- `GET /usage-stats` - Ver estatísticas de uso dos tokens

### 🔑 Tokens API
- `POST /tokens` - Criar novo token (seleção automática do melhor pacote)
- `POST /tokens/{package_id}` - Criar token para pacote específico
- `GET /tokens` - Listar meus tokens
- `DELETE /tokens/{token_id}` - Revogar token

### 🔍 Sistema de Busca
- `POST /api/search` - Realizar busca (requer header X-API-Key)
- `GET /api/search/stats` - Estatísticas de busca do token
- `GET /api/search/health` - Status do serviço de busca

### 📦 Pacotes Públicos
- `GET /packages` - Listar pacotes disponíveis

---

## 🚀 Implementação Básica

### 1. Configuração do Cliente HTTP

```javascript
// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: { 'Content-Type': 'application/json' }
});

// Adicionar token automaticamente
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
```

### 2. Autenticação

```javascript
// auth.js
import api from './api';

export const auth = {
  // Registrar usuário
  async register(email, password) {
    const response = await api.post('/register', { email, password });
    return response.data;
  },

  // Fazer login
  async login(email, password) {
    const response = await api.post('/login', { email, password });
    const { access_token, refresh_token } = response.data;
    
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    
    return response.data;
  },

  // Logout
  async logout() {
    await api.post('/logout');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  // Alterar senha
  async changePassword(currentPassword, newPassword) {
    const response = await api.put('/change-password', {
      current_password: currentPassword,
      new_password: newPassword
    });
    return response.data;
  }
};
```

### 3. Gerenciamento de Tokens

```javascript
// tokens.js
import api from './api';

export const tokens = {
  // Listar tokens
  async list() {
    const response = await api.get('/tokens');
    return response.data;
  },

  // Criar token
  async create(packageId = null) {
    const url = packageId ? `/tokens/${packageId}` : '/tokens';
    const response = await api.post(url);
    return response.data;
  },

  // Revogar token
  async revoke(tokenId) {
    await api.delete(`/tokens/${tokenId}`);
  },

  // Ver estatísticas
  async getStats() {
    const response = await api.get('/usage-stats');
    return response.data;
  }
};
```

### 4. Sistema de Busca

```javascript
// search.js
import axios from 'axios';

export const search = {
  // Realizar busca
  async perform(params, apiToken) {
    const response = await axios.post('http://localhost:8000/api/search', params, {
      headers: { 'X-API-Key': apiToken }
    });
    return response.data;
  },

  // Estatísticas de busca
  async getStats(apiToken) {
    const response = await axios.get('http://localhost:8000/api/search/stats', {
      headers: { 'X-API-Key': apiToken }
    });
    return response.data;
  },

  // Status do serviço
  async checkHealth() {
    const response = await axios.get('http://localhost:8000/api/search/health');
    return response.data;
  }
};
```

### 5. Pacotes

```javascript
// packages.js
import api from './api';

export const packages = {
  // Listar pacotes disponíveis
  async list() {
    const response = await api.get('/packages');
    return response.data;
  },

  // Ver meus pacotes
  async myPackages() {
    const response = await api.get('/my-packages');
    return response.data;
  }
};
```

---

## 📊 Estruturas de Dados

### Usuário
```javascript
{
  id: 1,
  email: "usuario@exemplo.com",
  is_active: true,
  created_at: "2024-01-15T10:30:00Z"
}
```

### Pacote
```javascript
{
  id: 1,
  name: "Starter",
  description: "Pacote inicial gratuito",
  request_limit: 100,
  token_limit: 1,
  price: 0, // em centavos
  is_active: true,
  created_at: "2024-01-15T10:30:00Z"
}
```

### Token
```javascript
{
  id: 1,
  token: "sk_1234567890abcdef",
  user_id: 1,
  package_id: 1,
  requests_used: 45,
  is_active: true,
  created_at: "2024-01-15T10:30:00Z",
  package: {
    name: "Starter",
    request_limit: 100,
    // ... outros campos do pacote
  }
}
```

### Resultado de Busca
```javascript
{
  results: [
    {
      title: "Título do resultado",
      url: "https://exemplo.com",
      description: "Descrição do resultado",
      position: 1,
      metadata: {
        pageid: 12345,
        wordcount: 1500
      }
    }
  ],
  suggestions: ["sugestão 1", "sugestão 2"],
  search_type: "web",
  engine: "google",
  query: "consulta de busca",
  page: 1,
  total_results: 10
}
```

---

## 🔍 Parâmetros de Busca

```javascript
const searchParams = {
  query: "sua busca aqui",        // obrigatório
  engine: "google",               // "google" ou "wikipedia"
  language: "pt",                 // código ISO 639-1
  region: "BR",                   // código ISO 3166-1
  safe_search: 1,                 // 0=off, 1=medium, 2=high
  time_range: "week",             // "day", "week", "month", "year"
  page: 1,                        // 1-10
  search_type: "web",             // "web", "images", "videos", "news"
  num: 10                         // 1-100 (max 50 para Wikipedia)
};
```

---

## 🎯 Fluxo de Uso Típico

### 1. Registro e Login
```javascript
// Registrar
await auth.register("usuario@exemplo.com", "MinhaSenh@123");

// Login
await auth.login("usuario@exemplo.com", "MinhaSenh@123");
// Token salvo automaticamente no localStorage
```

### 2. Criar Token API
```javascript
// Criar token (seleção automática do melhor pacote)
const token = await tokens.create();
console.log(token.token); // sk_1234567890abcdef
```

### 3. Realizar Busca
```javascript
const params = {
  query: "inteligência artificial",
  engine: "google",
  num: 10
};

const results = await search.perform(params, token.token);
console.log(results.results); // Array de resultados
```

### 4. Ver Estatísticas
```javascript
// Estatísticas gerais
const stats = await tokens.getStats();

// Estatísticas de busca específicas
const searchStats = await search.getStats(token.token);
```

---

## ⚠️ Tratamento de Erros

```javascript
try {
  const results = await search.perform(params, apiToken);
} catch (error) {
  if (error.response?.status === 401) {
    console.log('Token inválido');
  } else if (error.response?.status === 429) {
    console.log('Limite de requests excedido');
  } else if (error.response?.status === 503) {
    console.log('Serviço de busca indisponível');
  } else {
    console.log('Erro:', error.response?.data?.detail);
  }
}
```

---

## 🔒 Validação de Senha

A API exige senhas com:
- Mínimo 8 caracteres
- Pelo menos 1 letra maiúscula
- Pelo menos 1 letra minúscula  
- Pelo menos 1 número
- Pelo menos 1 caractere especial
- Sem caracteres repetidos consecutivos

```javascript
function validatePassword(password) {
  const errors = [];
  
  if (password.length < 8) errors.push('Mínimo 8 caracteres');
  if (!/[A-Z]/.test(password)) errors.push('Precisa de maiúscula');
  if (!/[a-z]/.test(password)) errors.push('Precisa de minúscula');
  if (!/\d/.test(password)) errors.push('Precisa de número');
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('Precisa de caractere especial');
  
  return errors;
}
```

---

## 📈 Pacotes Disponíveis

| Pacote | Requests | Preço | Custo por Request |
|--------|----------|-------|-------------------|
| Seekr Query Starter | 5,000 | Gratuito | - |
| Seekr Query 50kk | 50,000 | $15 | $0.30 |
| Seekr Query 500kk | 500,000 | $100 | $0.20 |
| Seekr Query 2.5kk | 2,500,000 | $400 | $0.16 |
| Seekr Query 12.5kk | 12,500,000 | $1,500 | $0.12 |
| Seekr Query 50kk | 50,000,000 | $4,000 | $0.08 |
| Seekr Query 100kk | 100,000,000 | $7,500 | $0.075 |
| Seekr Query 200kk | 200,000,000 | $12,000 | $0.06 |
| Seekr Query 400kk | 400,000,000 | $20,000 | $0.05 |

---

## 🛠️ Exemplo de Interface Simples

```html
<!DOCTYPE html>
<html>
<head>
    <title>Seekr API Client</title>
</head>
<body>
    <div id="app">
        <!-- Login Form -->
        <div id="login-form">
            <input type="email" id="email" placeholder="Email">
            <input type="password" id="password" placeholder="Senha">
            <button onclick="login()">Login</button>
        </div>

        <!-- Search Form -->
        <div id="search-form" style="display:none">
            <input type="text" id="query" placeholder="Digite sua busca">
            <select id="token-select"></select>
            <button onclick="performSearch()">Buscar</button>
        </div>

        <!-- Results -->
        <div id="results"></div>
    </div>

    <script>
        // Implementar as funções usando os exemplos acima
        async function login() {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            try {
                await auth.login(email, password);
                document.getElementById('login-form').style.display = 'none';
                document.getElementById('search-form').style.display = 'block';
                loadTokens();
            } catch (error) {
                alert('Erro no login');
            }
        }

        async function loadTokens() {
            const tokenList = await tokens.list();
            const select = document.getElementById('token-select');
            tokenList.forEach(token => {
                const option = document.createElement('option');
                option.value = token.token;
                option.text = `Token #${token.id} (${token.requests_used}/${token.package.request_limit})`;
                select.appendChild(option);
            });
        }

        async function performSearch() {
            const query = document.getElementById('query').value;
            const apiToken = document.getElementById('token-select').value;
            
            const results = await search.perform({ query }, apiToken);
            
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = results.results.map(result => 
                `<div>
                    <h3><a href="${result.url}" target="_blank">${result.title}</a></h3>
                    <p>${result.description}</p>
                </div>`
            ).join('');
        }
    </script>
</body>
</html>
```

Este guia fornece tudo que você precisa para implementar um frontend completo que consome todas as funcionalidades da Seekr API de forma simples e objetiva.
