import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
   <Switch>
    <Route path='/' exact>
      <LoginPage />
    </Route>
    <Route path = '/signup'>
      <SignUpPage />
    </Route>
   </Switch>
  );
}

export default App;
