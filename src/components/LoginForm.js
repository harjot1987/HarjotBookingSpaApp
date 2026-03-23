import React, { Component } from 'react';
import { Box, TextField, Button, Typography, Paper, Alert } from '@mui/material';

class LoginForm extends Component {
  state = {
    email: 'react@hipster-inc.com', // Pre-filled from credentials
    password: 'React@123',
    key_pass: '07ba959153fe7eec778361bf42079439',
    error: '',
    loading: false
  };

  handleLogin = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, error: '' });

    try {
      const response = await fetch('/api/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          key_pass: this.state.key_pass
        })
      });

      const data = await response.json();

      if (data.status === 'success') {
        this.props.onLoginSuccess(data.token); // Pass token to App.js
      } else {
        this.setState({ error: data.message || 'Login failed' });
      }
    } catch (err) {
      this.setState({ error: 'Network error. Please try again.' });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Paper elevation={3} sx={{ p: 4, width: 400 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
            Natureland Login
          </Typography>
          
          {this.state.error && <Alert severity="error" sx={{ mb: 2 }}>{this.state.error}</Alert>}

          <form onSubmit={this.handleLogin}>
            <TextField
              fullWidth label="Email" margin="normal"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
            <TextField
              fullWidth label="Password" type="password" margin="normal"
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
            <Button
              fullWidth variant="contained" size="large" type="submit"
              disabled={this.state.loading}
              sx={{ mt: 3, height: 50 }}
            >
              {this.state.loading ? 'Authenticating...' : 'Login'}
            </Button>
          </form>
        </Paper>
      </Box>
    );
  }
}

export default LoginForm;