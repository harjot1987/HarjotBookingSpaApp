import React, { Component } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  // Requirement: Catch component rendering failures
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Requirement: Logging/Error Tracking
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    // You could send this to an external logging service here
  }

  handleReset = () => {
    this.setState({ hasError: false });
    window.location.reload(); // Simple graceful recovery
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
          <Paper sx={{ p: 4, textAlign: 'center', maxWidth: 500, border: '1px solid #ffcdd2' }}>
            <ErrorOutlineIcon sx={{ fontSize: 60, color: '#f44336', mb: 2 }} />
            <Typography variant="h5" gutterBottom>Something went wrong.</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              The calendar encountered a rendering error. This usually happens with 
              corrupted data or high-load synchronization issues.
            </Typography>
            <Button variant="contained" onClick={this.handleReset}>
              Reload Calendar
            </Button>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;