import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import Chat from './components/Chat/Chat';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages } from './store/chat-actions';

function App() {
  const token = localStorage.getItem('token');
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();
    useEffect(() => {
      if(isLoggedIn) {
      dispatch(fetchMessages(token));
      }
    },[dispatch,token]);

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
