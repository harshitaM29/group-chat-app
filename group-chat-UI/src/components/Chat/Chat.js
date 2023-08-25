import { useSelector, useDispatch } from 'react-redux';
import classes from './Chat.module.css';
import { Fragment, useEffect, useState,  } from 'react';
import {  Card, Container  } from 'react-bootstrap';
import SideDrawer from '../Layout/SideDrawer';
import MyChats from './MyChats';
import ChatBox from './ChatBox';
const Chat = () => {
 const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
   
    return (
        <div style={{width:'100%'}}>
       
        {isLoggedIn && <SideDrawer />}
        <Card className={classes.chats}>
           {isLoggedIn && <MyChats />}
          {isLoggedIn && <ChatBox />} 
        </Card> 
 
     </div>
    )
};

export default Chat;