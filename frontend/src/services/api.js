const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const apiClient = {
  get: async (endpoint) => {
    const token = sessionStorage.getItem('authToken');
    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_URL}/api${endpoint}`, {
        method: 'GET',
        headers: headers,
      });

      if (!response.ok) {
        throw new Error('A resposta da rede não foi bem-sucedida.');
      }
      return response.json();
    } catch (error) {
      console.error(`Erro ao buscar dados de ${endpoint}:`, error);
      throw error;
    }
  },

  // Adicionar métodos para 'post', 'put', 'delete'
  // post: async (endpoint, body) => { ... }
};

export default apiClient;
