import React from 'react'
import { Card, Form } from 'react-bootstrap';
import classes from './UserListItem.module.css'

const UserListItem = ({ user, handleFunction}) => {

  return (
   <Card onClick={handleFunction} className={classes.card}>
    
    <Form.Text >Name: {user.name}</Form.Text>
    {/* <Form.Text sm={2}>Email: {user.email}</Form.Text> */}
  
   </Card>
  )
}

export default React.memo(UserListItem);
