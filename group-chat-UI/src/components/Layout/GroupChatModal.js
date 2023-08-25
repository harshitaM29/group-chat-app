import React,{Fragment, useState} from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import UserListItem from '../User/UserListItem';
import UserBadgeItem from '../User/UserBadgeItem';
import { createGroup } from '../../store/group-actions';
const GroupChatModal = ({ children }) => {
    const [show, setShow] = useState(false);
    const token = sessionStorage.getItem('token');
    const dispatch = useDispatch()
    const [selectedUsers,setSelectedUsers] = useState([]);
    const [search,setSearch] = useState("");
    const [name,setGroupName] = useState();
    const [searchResult,setSearchResult]= useState([]);
    const [loading,setLoading] = useState(false);
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
    const handleGroup = (userToAdd) => {
        if(selectedUsers.includes(userToAdd)) {
            alert('User already added');
            return;
        }
        setSelectedUsers([...selectedUsers,userToAdd]);
    }
    const handleDelete = (delUser) => {
        setSelectedUsers(selectedUsers.filter((sel) => sel.id !== delUser.id));
    }
    const handleSubmit = () => {
        let selectedId = selectedUsers.map(user => user.id);
        dispatch(createGroup(name,selectedId,token));
        setShow(false);
    }
    const handleClose = () => {
        setShow(false);
    }
  const handleShow = () => setShow(true);
  return (
    <Fragment>
         <span onClick={handleShow}>{children}</span>
    <Modal show={show} onHide={handleClose} centered>
    <Modal.Header closeButton>
      Create New Group
    </Modal.Header>
    <Modal.Body>
      <Form>
      <Form.Group className="mb-3" >
        <Form.Control type="text" placeholder='Enter Group Name'  onChange={(e) => setGroupName(e.target.value) } />
        </Form.Group>
        <Form.Group className="mb-3" >
        <Form.Control type="search" placeholder='Add Users' onChange={handleSearch} />
        </Form.Group>
      </Form>
      {selectedUsers.map(u => (
                <UserBadgeItem key={u.id} user={u} handleFunction={() => handleDelete(u)}/>
      )) }
      
        {loading? <div>Searching</div>: (
            searchResult?.slice(0,4).map(user =>(
                <UserListItem key={user.id} user={user} handleFunction={() =>handleGroup(user)} />
            )) 
        )}
        
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={handleSubmit}>
       Create Group
      </Button>
    </Modal.Footer>
  </Modal>
  </Fragment>
  )
}

export default GroupChatModal;
