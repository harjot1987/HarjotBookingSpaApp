import axios from 'axios';

const BASE_URL = 'https://dev.natureland.hipster-virtual.com';

export const login = async () => {
  try {

  /*   try {
    const response = await axios.post(
      'http://localhost:5000/api/login',
      {
        email: 'react@hipster-inc.com',
        password: 'React@123'
      }
    ); */
    const response = await axios.post(`${BASE_URL}/login`, {
      email: 'react@hipster-inc.com',
      password: 'React@123',
      key_pass: '07ba959153fe7eec778361bf42079439'
    });

    const token = response.data?.token;

    if (token) {
      localStorage.setItem('token', token);
    }

    return token;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};