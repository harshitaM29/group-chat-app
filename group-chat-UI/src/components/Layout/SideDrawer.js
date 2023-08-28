import React, { Fragment } from 'react'
import { Button, Nav , Container, Navbar    } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import { useHistory } from 'react-router-dom';

const SideDrawer = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const logoutHandler = (e) => {
        e.preventDefault();
        dispatch(authActions.logout());
        history.replace('/');
    }

  return (
    <Fragment>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
       <Navbar.Brand>Group Chat App</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          
         
          </Nav>
         <Button onClick={logoutHandler}>Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
   
    </Fragment>
  )
}

export default SideDrawer;
