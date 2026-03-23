const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

const BASE_URL = 'https://dev.natureland.hipster-virtual.com';

app.post('/api/login', async (req, res) => {
  try {
    console.log('👉 Incoming login request:', req.body);

    // ✅ STEP 1: Get CSRF cookie
    const csrfResponse = await axios.get(`${BASE_URL}/api/account`, {
      headers: {
        key_pass: '07ba959153fe7eec778361bf42079439'
      },
      withCredentials: true
    });

    const cookies = csrfResponse.headers['set-cookie'];
    console.log('🍪 Cookies received:', cookies);

    // ✅ Extract XSRF token from cookie
    const xsrfCookie = cookies?.find(c => c.includes('XSRF-TOKEN'));
    const xsrfToken = xsrfCookie
      ? decodeURIComponent(xsrfCookie.split(';')[0].split('=')[1])
      : '';

    console.log('🔐 XSRF TOKEN:', xsrfToken);

    // ❗ If no token → fail early
    if (!xsrfToken) {
      return res.status(500).json({
        error: 'Failed to get CSRF token'
      });
    }

    // ✅ STEP 2: Login with cookie + token
    const loginResponse = await axios.post(
     `${BASE_URL}/api/auth`, // 🔁 If fails, try /api/authenticate
      req.body,
      {
        headers: {
          key_pass: '07ba959153fe7eec778361bf42079439',
          Cookie: cookies.join('; '),
          'X-XSRF-TOKEN': xsrfToken
        },
        withCredentials: true
      }
    );

    console.log('✅ LOGIN SUCCESS:', loginResponse.data);

    res.json(loginResponse.data);

  } catch (error) {
    console.error('❌ SERVER ERROR:', error.response?.data || error.message);

    res.status(500).json({
      error: error.response?.data || 'Login failed'
    });
  }
});

app.listen(5000, () => {
  console.log('🚀 Proxy server running on http://localhost:5000');
});