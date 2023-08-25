import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import Chat from './components/Chat/Chat';
import { useSelector } from 'react-redux';

function App() {
 

  return (
   <Switch>
    <Route path='/' exact>
      <LoginPage />
    </Route>
    <Route path = '/signup'>
      <SignUpPage />
    </Route>
    <Route path = '/chats'>
      <Chat />
    </Route>
   </Switch>
  );
}

export default App;
