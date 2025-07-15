const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const getAuthHeaders = () => {
    const token = sessionStorage.getItem('authToken');
    const headers = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Erro HTTP: ${response.status}`);
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json();
    }
    return null; 
};


const apiClient = {
  get: async (endpoint) => {
    const response = await fetch(`${API_URL}/api${endpoint}`, {
        method: 'GET',
        headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  post: async (endpoint, body) => {
    const response = await fetch(`${API_URL}/api${endpoint}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(body),
    });
    return handleResponse(response);
  },

  put: async (endpoint, body) => {
    const response = await fetch(`${API_URL}/api${endpoint}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(body),
    });
    return handleResponse(response);
  },

  delete: async (endpoint) => {
    const response = await fetch(`${API_URL}/api${endpoint}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

export default apiClient;

