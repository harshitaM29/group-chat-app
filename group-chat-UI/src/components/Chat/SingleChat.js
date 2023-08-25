import React, { Fragment, useEffect, useState } from 'react'
import { Card, Container,Form,Spinner, Row,Col, Button  } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import classes from './SingleChat.module.css';
import UpdateGroupModal from '../Layout/UpdateGroupModal';
import { createMessage, fetchMessages } from '../../store/message-actions';
import ScrollableChat from './ScrollableChat';
const SingleChat = () => {
    const selectedChat = useSelector(state => state.chat.selectedChat);
    const messages = useSelector(state => state.messages.messages)
    const [message,setMessage] = useState();
    const [loading,setLoading] = useState(false);
    const token = sessionStorage.getItem('token');
    const dispatch = useDispatch();
    const fetchAllMessages = () => {
        if(!selectedChat) {
            return;
        }
        dispatch(fetchMessages(token,selectedChat.id));
    };

    useEffect(() => {
        fetchAllMessages();
    },[selectedChat]);

    const sendMessage = (e) => {
        e.preventDefault();
        dispatch(createMessage(token,selectedChat.id,message));
        setMessage("");
    }

    const typingHandler = (e) => {
        setMessage(e.target.value)
    }
  return (
   <Fragment>
    {  selectedChat ? (
        <>
        <div className={classes.grpname}>
           <h5> {selectedChat.name}</h5>
             <UpdateGroupModal />
        </div>
        <Card className={classes.messages}>
          {loading ? (
            <Spinner animation="border" role="status" style={{alignSelf:'center', width:'20', height:'20', margin:'auto'}}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          )
          : (
            <>
            <div className={classes.msg}>
                <ScrollableChat messages={messages} />
            </div>
            </>
          )
          }
          <Form className={classes.form} onSubmit={sendMessage}>
        <Row>
          <Col >
            <Form.Control
              type="text"
              placeholder="Type Message"
              className="mb-2"
              required
              onChange={typingHandler}
              value={message}
            />
          </Col>
          <Col xs="auto">
            <Button type="submit" >Send</Button>
          </Col>
        </Row>
      </Form>
        </Card>
        </>
    ) : (
        <Container className={classes.startchat}>
            <Card.Text>Click on a group to start conversation</Card.Text>
        </Container>
    )
}
      </Fragment>
  )
}

export default SingleChat
