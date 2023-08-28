import React, { Fragment, useEffect, useState, useRef } from 'react'
import { Card, Container,Form,Spinner, Row,Col, Button  } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import classes from './SingleChat.module.css';
import UpdateGroupModal from '../Layout/UpdateGroupModal';
import ScrollableChat from './ScrollableChat';
import { io }  from 'socket.io-client';
import axios from 'axios';
import { baseURL } from '../../constants';

const ENDPOINT = baseURL;
var socket;

const SingleChat = () => {
  
  const inputRef = useRef(null);
    const selectedChat = useSelector(state => state.chat.selectedChat);
    const id = localStorage.getItem('id');
    const [convertedFile,setConvertedFile] = useState();
    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
    const [message,setMessage] = useState();
    const [loading,setLoading] = useState(false);
    const [socketConnected,setSocketConnected] = useState(false)
    const token = sessionStorage.getItem('token');

    const [messageList,setMessageList] = useState([]);
    useEffect(() => {
      socket = io(ENDPOINT);
      socket.emit("setup",id);
      socket.on('connection',() => {
          setSocketConnected(true)
      });
      
  },[]);

    const fetchAllMessages = async() => {
        if(!selectedChat) {
            return;
        }
        try {
          const response = await axios.get(`${baseURL}/message/fetchMessages/${selectedChat.id}`, {
              headers: { "Authorization": token}
          });
          setMessageList(response.data);
          socket.emit("join chat", selectedChat.id);
      } catch (error) {
          
      }
        socket.emit("joinchat",selectedChat.id);
    };

    const sendMessage = async(e) => {
        e.preventDefault();
        try {
          const response = await axios.post(`${baseURL}/message/sendMessage`,{id:selectedChat.id,message:message}, {
              headers: { "Authorization": token}
          });
          setMessage("");
          socket.emit("newMessage", response.data);
          setMessageList([...messageList,response.data]);
      } catch (error) {
          
      };
    }

    useEffect(() => {
      fetchAllMessages();
  },[selectedChat]);

    useEffect(() => {
     
      socket.on("received_message",(newMessageReceived) => {
      
          console.log(newMessageReceived)
         setMessageList([...messageList,newMessageReceived])
       
      })
    });

    const handleClick = () => {

      setIsFilePicked(false);
      setSelectedFile();
      inputRef.current.click();

    };
    
    const handleFileChange = async(event) => {
      
      const fileObj = event.target.files && event.target.files[0];
      const file = await convertToBase64(fileObj);
      setConvertedFile(file)
      if (!fileObj) {
        return;
      }
      event.target.value = null;
  
     setSelectedFile(fileObj.name)
      setIsFilePicked(true);
    
    };
  
    const convertToBase64 = (file) => {
      return new Promise(resolve => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
              resolve(reader.result);
          }
      })
  };

   const handleSendMedia = async() => {
    try {
      const response = await axios.post(`${baseURL}/message/sendMediaFiles`,{id:selectedChat.id,file:convertedFile,filename:selectedFile}, {
          headers: { "Authorization": token}
      });
      
      setMessage("");
      socket.emit("newMessage", response.data.sentMediaMessage);
      setMessageList([...messageList,response.data.sentMediaMessage]);
  } catch (error) {
      
  }
   };

    const typingHandler = (e) => {
        setMessage(e.target.value)
    }
  return (
   <Fragment>
    {  selectedChat ? (
        <>
        <div className={classes.grpname}>
           <h5> {selectedChat.name}</h5>
           <p></p>
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
                <ScrollableChat messages={messageList} />
            </div>
            </>
          )
          }
          <Form className={classes.form} onSubmit={sendMessage}>
        <Row>
          <Col >
            <Form.Control
              type="text/file"
              placeholder="Type Message"
              className="mb-1"
              onChange={typingHandler}
              value={message}
            />
              
          </Col>
          <Col xs="auto"> 
          <div>
      <input
        style={{display: 'none'}}
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
      />
 {isFilePicked && <Button variant="secondary" onClick={handleSendMedia}><i class="fa fa-arrow-up" variant="secondary" aria-hidden="true"></i></Button> } 
 <Button onClick={handleClick}><i class="fa fa-paperclip" aria-hidden="true"></i></Button>
    </div>
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

export default SingleChat;
