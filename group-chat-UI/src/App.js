import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import Chat from './components/Chat/Chat';

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
