// src/services/api.js
import axios from 'axios';

const API_BASE_URL = '';

// Create axios instance with default config
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

// Books APIs
export const booksAPI = {
    // Create a new book
    create: async (bookData) => {
        const response = await apiClient.post('/api/books', bookData);
        return response.data;
    },

    // List all books with pagination
    list: async (skip = 0, limit = 10) => {
        const response = await apiClient.get('/api/books', {
            params: { skip, limit }
        });
        return response.data;
    },

    // Get book by ID
    getById: async (bookId) => {
        const response = await apiClient.get(`/api/books/${bookId}`);
        return response.data;
    },

    // Update book
    update: async (bookId, bookData) => {
        const response = await apiClient.put(`/api/books/${bookId}`, bookData);
        return response.data;
    },

    // Delete book
    delete: async (bookId) => {
        const response = await apiClient.delete(`/api/books/${bookId}`);
        return response.data;
    },

    // Search books (client-side filtering since API doesn't have search endpoint)
    search: async (query, skip = 0, limit = 100) => {
        const response = await apiClient.get('/api/books', {
            params: { skip, limit }
        });

        if (!query) return response.data;

        // Client-side filtering
        const filtered = response.data.filter(book =>
            book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase()) ||
            book.isbn?.toLowerCase().includes(query.toLowerCase())
        );

        return filtered;
    }
};

// Health Check
export const healthAPI = {
    check: async () => {
        const response = await apiClient.get('/health');
        return response.data;
    }
};

// Root endpoint
export const rootAPI = {
    get: async () => {
        const response = await apiClient.get('/');
        return response.data;
    }
};

export default apiClient;