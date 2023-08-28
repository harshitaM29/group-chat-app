import React from 'react'
import { Badge } from 'react-bootstrap';
const UserBadgeItem = ({user, handleFunction}) => {

  return (
    <Badge onClick={handleFunction} style={{cursor:'pointer', marginLeft:'0.5rem'}}>
        {user.name} X
       
    </Badge>
  )
}

export default React.memo(UserBadgeItem);
