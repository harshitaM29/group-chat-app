import { useSelector } from 'react-redux';
import classes from './Chat.module.css';
import { Fragment,  } from 'react';
import {  Card, ListGroup,Form, Row,Col, Button  } from 'react-bootstrap';
const Chat = () => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    return (
        <Fragment>
       
        <h1 className={classes.head}>Chat App</h1>
        <Card className={classes.list}>
      
       {isLoggedIn && <ListGroup.Item variant="secondary" className='p-2'>You Joined</ListGroup.Item> }
       <ListGroup.Item className='p-2'>Vaibhav Joined</ListGroup.Item>
       <ListGroup.Item variant="secondary" className='p-2'>You Joined</ListGroup.Item>
     
    
      
    </Card>
   <Card className={classes.chats}>
       
   <Form>
      <Row>
        <Col xs={10}>
          <Form.Control />
        </Col>
        <Col>
         <Button className={classes.actions}>Send</Button>
        </Col>
        </Row>
        </Form>
        
        </Card>
     </Fragment>
    )
};

export default Chat;