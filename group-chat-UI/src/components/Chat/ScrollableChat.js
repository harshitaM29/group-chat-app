import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import validator from 'validator';

const ScrollableChat = ({messages}) => {
    const id = localStorage.getItem('id');
  return (
    <ScrollableFeed forceScroll="true">
      {messages && messages.map((m,i) => (
        <div style={{display:'flex', justifyContent:'space-between', flexDirection:'row',lineHeight:'30px'}} key={m.id}>
        
            <span style={{
              
                backgroundColor:(m.userId === +id) ? "#BEE3F8" :"#B9F5D0" ,
                borderRadius:"20px",
                padding:"5px 15px",
                maxWidth:"75%",
                marginBottom:"0.5rem"
            
            }}>
                
               { m.userId === +id ? "You" : m.sender}: {validator.isURL(m.message) ? <img src={m.message} width="200"/>: m.message}
            </span>
        </div>
      ))}
    </ScrollableFeed>
  )
}

export default ScrollableChat;
