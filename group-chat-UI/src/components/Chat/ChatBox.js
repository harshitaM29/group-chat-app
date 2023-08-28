import React from 'react'
import classes from './ChatBox.module.css';
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import SingleChat from './SingleChat';
const ChatBox = () => {

  return (
    <Card className={classes.card}>
     <SingleChat />
    </Card>
  )
}

export default ChatBox;
