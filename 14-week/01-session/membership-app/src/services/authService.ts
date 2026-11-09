
const API_URL = 'https://dummyjson.com';

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
      expiresInMins: 30,
    }),
  });

  if (response.status === 401) {
    throw new Error('Usuario o contraseña incorrectos.');
  }

  if (!response.ok) {
    throw new Error('No fue posible iniciar sesión.');
  }

  return await response.json();
};

export const getUserProfile = async (
  token: string
): Promise<User> => {
  const response = await fetch(`${API_URL}/auth/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    throw new Error('401: Tu sesión expiró o el token no es válido.');
  }

  if (!response.ok) {
    throw new Error('No fue posible consultar el perfil.');
  }

  return await response.json();
};

