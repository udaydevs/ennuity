import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getCSRFToken() {
  try {
    const response = await api.get('/account/csrf/');
    let token = response.data?.csrfToken;

    if (!token) {
      const match = document.cookie.match(/csrftoken=([^;]+)/);
      token = match ? match[1] : null;
    }

    if (token) {
      api.defaults.headers.common['X-CSRFToken'] = token;
      return token;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
  }
}

export default api;
