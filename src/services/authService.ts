import API from './api';

interface LoginPayload {
  email: string;
  password: string;
}

export const loginUser = async (payload: LoginPayload) => {
  const response = await API.post('/auth/login', payload);
  return response.data; // { token, user, etc. }
};

export const getUser = async () => {
    const response = await API.get('/users/me');
    return response.data; // { token, user, etc. }
  };