import React, { Fragment, useRef, useState } from 'react'
import { Modal, Form, Button,Badge, Row, Col,Overlay,Tooltip  } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';
import UserBadgeItem from '../User/UserBadgeItem';
import { useDispatch } from 'react-redux';
import { chatActions } from '../../store/chat';
import { groupActions } from '../../store/group';
import { addNewUser, changeAdmin, fetchAllGroupUsers, removeUser } from '../../store/group-actions';
import UserListItem from '../User/UserListItem';
const UpdateGroupModal = () => {
    const dispatch = useDispatch();
    const userId = localStorage.getItem('id');
    const [show, setShow] = useState(false);
    const [search,setSearch] = useState("");
    const [name,setGroupName] = useState();
    const [searchResult,setSearchResult]= useState([]);
    const [newAdmin, setNewAdmin] = useState([]);
    const [loading,setLoading] = useState(false);
    const selectedChat = useSelector(state => state.chat.selectedChat);
    let users = useSelector(state => state.group.groupusers)
    const token = sessionStorage.getItem('token');
    const isGroupAdmin = +userId === +  selectedChat.groupAdmin;
   
  const handleClose = () => setShow(false);
  const handleShow = async() => {
    setShow(true);
    dispatch(fetchAllGroupUsers(token,selectedChat.id));
  }
  const handleAdminSearch = async(e) => {
    setSearch(e.target.value)
    try {
      const response = await axios.get(`http://localhost:4000/user/search?name=${search}`, {
          headers: {"Authorization" : token }
      });
      
      setNewAdmin(response.data);
     
     } catch (error) {
     
          throw new Error(error);
     }
  }
  const handleSearch = async(e) => {
    setSearch(e.target.value);
    if(!search) {
     return;
    }
    setLoading(true);
    try {
     const response = await axios.get(`http://localhost:4000/user/search?name=${search}`, {
         headers: {"Authorization" : token }
     });
     setLoading(false);
     setSearchResult(response.data);
     setSearch("");
    } catch (error) {
     setLoading(false);
         throw new Error(error);
    }
 };
 
     const handleRemove = (e,userId) => {
      e.preventDefault();
        if(!isGroupAdmin) {
          alert('Only Admins can remove users!!!!!');
          return;
        };
        dispatch(removeUser(token,selectedChat.id,userId));
        dispatch(groupActions.deleteUser(userId));
        
     }
     const handleAddUser = (e,user) => {
      e.preventDefault();
      setSearchResult([]);
      setSearch("")
      const isElementPresent = users.some((o) => o.id === user.id);
      if(isElementPresent) {
        alert('User already present');
        return;
      }
      dispatch(addNewUser(token,selectedChat.id,user.id))
     }
     const handleRename = async() => {
      
            try {
             const response = await axios.put(`http://localhost:4000/group/renamegroup`, {id:selectedChat.id,name:name},{
                 headers: {"Authorization" : token }
             });
           
             dispatch(chatActions.setSelectedChat(response.data))
            } catch (error) {
             
                 throw new Error(error);
            }
     }
    const handleLeaveGroup = (e,userId) => {
        //  e.preventDefault();
        dispatch(removeUser(token,selectedChat.id,userId));
        dispatch(groupActions.deleteUser(userId));
        dispatch(groupActions.removeFromGroup(selectedChat.id));
        dispatch(chatActions.setSelectedChat(""));
        setShow(false);
     }
     const handleChangeAdmin = (e,user) => {
      e.preventDefault();
      setNewAdmin([]);
      dispatch(changeAdmin(token,selectedChat.id,user.id));
      
     }
  return (
    <Fragment>
         <Badge pill bg="info" onClick={handleShow} style={{cursor:'pointer'}}>
        View
      </Badge>
    <Modal show={show}  backdrop="static"
        keyboard={false}>
    <Modal.Header>
      <Modal.Title>{selectedChat.name}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
   {loading ? <div>Loading...</div> : 
    users.map((u) => (
         <UserBadgeItem key={u.id} user={u}   handleFunction={(e) => handleRemove(e,u.id)}/>
    ))
}
    <Form style={{marginTop:'0.5rem'}}>
        <Row>
          <Col >
            <Form.Control
              type="text"
              placeholder="Enter New Group Name"
              className="mb-3"
              value={name}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </Col>
          <Col xs="auto">
            <Button type="submit" onClick={handleRename}>Rename</Button>
          </Col>
        </Row>
      </Form>
      {isGroupAdmin && <Form inline style={{marginTop:'0.5rem'}}>
        <Row>
          <Col >
            <Form.Control
              type="text"
              placeholder="Search User"
              className="mb-3"
              onChange={handleSearch}
            />
          </Col>
        </Row>
      </Form> }
      {searchResult.map((u) => (
           <UserListItem key={u.id} user={u} handleFunction={(e) => handleAddUser(e,u)} />
      ))}
     {isGroupAdmin &&  <Form.Control
              type="text"
              placeholder="Add admin before leaving group"
              className="mb-3"
              onChange={handleAdminSearch}
              
            />}
        {newAdmin.map((u) => (
           <UserListItem key={u.id} user={u} handleFunction={(e) => handleChangeAdmin(e,u)} />
      ))}    
    </Modal.Body>
    <Modal.Footer>
    <Button variant="danger" onClick={(e) => {
      if(isGroupAdmin && !search) {
        alert('Please make someone admin');
      }
      handleLeaveGroup(e,+userId)
    }}>
        Leave Group
      </Button>
      <Button variant="primary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
  </Fragment>
  )
}

export default UpdateGroupModal
