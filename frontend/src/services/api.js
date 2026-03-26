// API Service - Connect to real backend
// Uses relative URL so nginx proxy works in Docker; override via VITE_API_URL
const API_URL = import.meta.env.VITE_API_URL || '/api';

// Helper to get auth headers
const getAuthHeaders = () => {
  const stored = localStorage.getItem('banking_auth');
  if (stored) {
    const { token } = JSON.parse(stored);
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

// Helper for API requests
const request = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
};

// Auth APIs
export const registerUser = (payload) => {
  return request('/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

export const loginUser = (payload) => {
  return request('/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

// Account APIs
export const getAccount = () => {
  return request('/account');
};

// Transaction APIs
export const deposit = (amount, description) => {
  return request('/deposit', {
    method: 'POST',
    body: JSON.stringify({ amount, description }),
  });
};

export const withdraw = (amount, description) => {
  return request('/withdraw', {
    method: 'POST',
    body: JSON.stringify({ amount, description }),
  });
};

export const getTransactions = () => {
  return request('/transactions');
};
