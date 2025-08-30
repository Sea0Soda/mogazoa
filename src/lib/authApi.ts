const API_BASE_URL = 'https://mogazoa-api.vercel.app';
const TEAM_ID = '16-5';

interface AuthUser {
  id: number;
  email: string;
  nickname: string;
  description: string;
  image: string | null;
  teamId: string;
  createdAt: string;
  updatedAt: string;
}

interface SignInResponse {
  user: AuthUser;
  accessToken: string;
}

interface SignUpResponse {
  accessToken: string;
  user: AuthUser;
}

export const signInAPI = async (data: {
  email: string;
  password: string;
}): Promise<SignInResponse> => {
  const response = await fetch(`${API_BASE_URL}/${TEAM_ID}/auth/signIn`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  return response.json();
};

export const signUpAPI = async (data: {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}): Promise<SignUpResponse> => {
  const response = await fetch(`${API_BASE_URL}/${TEAM_ID}/auth/signUp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Sign up failed');
  }

  return response.json();
};

export const transformUser = (apiUser: AuthUser) => ({
  id: apiUser.id.toString(),
  email: apiUser.email,
  nickname: apiUser.nickname,
  profileImage: apiUser.image || undefined,
});

export const setAuthToken = (token: string) => {
  localStorage.setItem('auth-token', token);
};

export const getAuthToken = () => {
  return localStorage.getItem('auth-token');
};

export const removeAuthToken = () => {
  localStorage.removeItem('auth-token');
};
