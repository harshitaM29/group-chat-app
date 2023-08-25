import React from 'react'
import { Badge, Card, Form} from 'react-bootstrap';
import classes from './UserListItem.module.css'
const UserBadgeItem = ({user, handleFunction}) => {
  return (
    <Badge onClick={handleFunction} style={{cursor:'pointer', marginLeft:'0.5rem'}}>
        {user.name} X
       
    </Badge>
  )
}

export default UserBadgeItem;
