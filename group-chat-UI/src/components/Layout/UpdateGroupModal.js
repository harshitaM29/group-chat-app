import React, { Fragment, useEffect, useState } from 'react'
import { Modal, Form, Button,Badge, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';
import UserBadgeItem from '../User/UserBadgeItem';
import { useDispatch } from 'react-redux';
import { chatActions } from '../../store/chat';
const UpdateGroupModal = () => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [selectedUsers,setSelectedUsers] = useState([]);
    const [search,setSearch] = useState("");
    const [users,setUsers] = useState([]);
    const [name,setGroupName] = useState();
    const [searchResult,setSearchResult]= useState([]);
    const [loading,setLoading] = useState(false);
    const selectedChat = useSelector(state => state.chat.selectedChat);
    const token = sessionStorage.getItem('token');
  const handleClose = () => setShow(false);
  const handleShow = async() => {
    setShow(true);
    try {
        const groupId = selectedChat.id;
    const response = await axios.get(`http://localhost:4000/group/getallgroupusers/${groupId}`,{
        headers: {"Authorization" : token }
    })
    setUsers(response.data[0].users)
    }catch(err) {
        throw new Error(err);
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
    } catch (error) {
     setLoading(false);
         throw new Error(error);
    }
 };
     const handleRemove = (user) => {

     }
     const handleRename = async() => {
            try {
             const response = await axios.put(`http://localhost:4000/group/renamegroup`, {id:selectedChat.id, name:name},{
                 headers: {"Authorization" : token }
             });
             dispatch(chatActions.setSelectedChat(response.data))
            } catch (error) {
             
                 throw new Error(error);
            }
     }
  return (
    <Fragment>
         <Badge pill bg="info" onClick={handleShow} style={{cursor:'pointer'}}>
        View
      </Badge>
    <Modal show={show} onHide={handleClose} backdrop="static"
        keyboard={false}>
    <Modal.Header closeButton>
      <Modal.Title>{selectedChat.name}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
   
    {users.map((u) => (
         <UserBadgeItem key={u.id} user={u} handleFunction={() => handleRemove(u)}/>
    ))}
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
      <Form inline style={{marginTop:'0.5rem'}}>
        <Row>
          <Col >
            <Form.Control
              type="text"
              placeholder="Search User"
              className="mb-3"
              onChange={handleSearch}
            />
          </Col>
          <Col xs="auto">
            <Button type="submit" onClick={handleRename}>Add</Button>
          </Col>
        </Row>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      {/* <Button variant="primary" onClick={handleClose}>
        Save Changes
      </Button> */}
    </Modal.Footer>
  </Modal>
  </Fragment>
  )
}

export default UpdateGroupModal
