import React, { Component } from 'react';
import CalendarGrid from './components/CalendarGrid';

// ❌ DISABLE LOGIN FOR NOW
// import { login } from './services/authService';

class App extends Component {
  state = {
    isReady: true // ✅ directly ready
  };

  /*
  // ❌ ENABLE THIS LATER (when backend works)
  async componentDidMount() {
    try {
      await login();
      this.setState({ isReady: true });
    } catch (error) {
      console.error('App init failed');
    }
  }
  */

  render() {
    if (!this.state.isReady) {
      return <div>Loading App...</div>;
    }

    return <CalendarGrid />;
  }
}

export default App;