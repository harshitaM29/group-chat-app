import { useSelector, useDispatch } from 'react-redux';
import classes from './Chat.module.css';
import { Fragment, useState,  } from 'react';
import {  Card, ListGroup,Form, Row,Col, Button  } from 'react-bootstrap';
import { sendMessage } from '../../store/chat-actions';
const Chat = () => {
  const[message,setMessage] = useState('');
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const messages = useSelector(state => state.chats.receivedChats);
   messages.map((msg) => (
    localStorage.setItem(msg.id,msg.message)
   ))
    const dispatch = useDispatch();
    const token = sessionStorage.getItem('token');

    const updatedMessage = (e) => {
      setMessage(e.target.value);
    }
    const handleSendMessage = (e) => {
      e.preventDefault();
      dispatch(sendMessage(message,token));
      setMessage('');
    }
    return (
        <Fragment>
       
        <h1 className={classes.head}>Chat App</h1>
        <Card className={classes.list}>
      
       {isLoggedIn && <ListGroup.Item variant="secondary" className='p-2'>You Joined</ListGroup.Item> }
       <ListGroup.Item className='p-2'>Vaibhav Joined</ListGroup.Item>
      {messages.map((item) => (
        <ListGroup.Item variant="secondary" className='p-2'>{item.message}</ListGroup.Item>
      ))} 
     
    
      
    </Card>
   <Card className={classes.chats}>
       
   <Form onSubmit={handleSendMessage}>
      <Row>
        <Col xs={10}>
          <Form.Control type='text' value={message} onChange={updatedMessage}/>
        </Col>
        <Col>
         <Button className={classes.actions} type="submit">Send</Button>
        </Col>
        </Row>
        </Form>
        
        </Card>
     </Fragment>
    )
};

export default Chat;