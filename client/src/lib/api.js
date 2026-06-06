// In dev, Vite proxies /api to the local server. In production the frontend
// is static on Vercel and the API lives on Railway, so VITE_API_URL points at
// the absolute backend origin (e.g. https://<app>.up.railway.app/api).
const API_BASE = import.meta.env.VITE_API_URL || '/api';

export class ApiError extends Error {
  constructor(status, message, errors) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

async function fetchApi(endpoint, options = {}) {
  const token = window.localStorage.getItem('curso.auth.token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  let data;
  try {
    data = await response.json();
  } catch (err) {
    data = null;
  }

  if (!response.ok) {
    throw new ApiError(
      response.status,
      (typeof data?.error === 'string' ? data.error : data?.error?.message) || 'API request failed',
      data?.details ?? data?.error?.details
    );
  }

  return data;
}

export const api = {
  auth: {
    login: (credentials) => fetchApi('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
    register: (credentials) => fetchApi('/auth/register', { method: 'POST', body: JSON.stringify(credentials) }),
    me: () => fetchApi('/auth/me'),
  },
  courses: {
    getAllProgress: () => fetchApi('/courses/progress'),
    upsertProgress: (courseId, lessonIndex, completed) => 
      fetchApi(`/courses/${courseId}/progress/${lessonIndex}`, {
        method: 'POST',
        body: JSON.stringify({ completed }),
      }),
  },
  billing: {
    // Inicia el cobro. Con Stripe configurado devuelve { url } (redirección
    // externa). En modo demo devuelve { mock: true, amount, currency } y el
    // front muestra su propia página de checkout.
    checkout: () => fetchApi('/billing/checkout', { method: 'POST' }),
    // Solo modo demo: confirma el "pago" simulado y activa PRO.
    confirmDemo: () => fetchApi('/billing/demo/confirm', { method: 'POST' }),
  },
};
