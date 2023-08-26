import React, { useEffect, useState } from 'react'
import { Button, Card, Container,Stack  } from 'react-bootstrap';
import classes from './MyChats.module.css';
import GroupChatModal from '../Layout/GroupChatModal';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllGroups } from '../../store/group-actions';
import { chatActions } from '../../store/chat';
const MyChats = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const token = sessionStorage.getItem('token');
  const dispatch = useDispatch();
  useEffect(() => {
    if(isLoggedIn) {
     dispatch(fetchAllGroups(token))
    }
  },[dispatch,token,isLoggedIn]);
  
  const chats = useSelector(state => state.group.groupName);
  
  const selectChat = useSelector(state => state.chat.selectedChat);

  return (
    <Card className={classes.card}>
      <div className={classes.container}>
       <h5>My Groups</h5>
       <GroupChatModal>
       <Button variant="outline-secondary">Add Group</Button>
       </GroupChatModal>
      </div>
    {chats.length !==0 ? <Container className={classes.groups}>
      <Stack gap={3}>
     {chats.map((chat) => (
        <Card className={classes.group} key={chat.id} onClick={() => dispatch(chatActions.setSelectedChat(chat))} style={{
          background:(selectChat === chat) ? "#38B2AC": "#E8E8E8",
          color:(selectChat === chat) ? "white": "black",
        }}>
        <Card.Text>
           {chat.name}
          </Card.Text>
        </Card>
        
     ))} 
    </Stack>
      </Container>: 
      <p style={{marginLeft:'1rem'}}>No Groups Present</p>}  
    </Card>
  )
}

export default MyChats
