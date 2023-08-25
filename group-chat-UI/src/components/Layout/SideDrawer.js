import React, { Fragment, useState } from 'react'
import { Button, Nav , Container, Form, Navbar    } from 'react-bootstrap';
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
    {/* <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Search Users</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={search}
              onChange={(e) => {setSearch(e.target.value)}}
            />
            <Button variant="outline-success" onClick={handleSearch}>Search</Button>
          </Form>
         <span>{searchResult?.map((user) => (
          <UserListItem key={user.id} user={user} handleFunction={() => accessChat(user.id)} />
         ))}</span>
        </Offcanvas.Body>
      </Offcanvas> */}
    </Fragment>
  )
}

export default SideDrawer;
