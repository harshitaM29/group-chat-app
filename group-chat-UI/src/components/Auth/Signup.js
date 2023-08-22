import classes from './Signup.module.css';
import { Form, Button, ButtonGroup, Card } from 'react-bootstrap';
import { useState, useRef } from 'react';
import axios from 'axios';
const Signup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const nameInputRef = useRef();
    const phoneInputRef = useRef();
    const switchAuthModeHandler = () => {
        // history.push('/')
    };
    const signUpHandler = async(e) => {
        e.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredName = nameInputRef.current.value;
        const enteredPhone = phoneInputRef.current.value;
        const signupData = {
          name:enteredName,
          email:enteredEmail,
          phoneNumber:enteredPhone,
          password:enteredPassword,
        }
        setIsLoading(true);
        try {
        const response = await axios.post('http://localhost:4000/user/signup',signupData);
          setIsLoading(false);
        //   history.push('/');
        } catch(err) {
          setIsLoading(false);
          emailInputRef.current.value = "";
          if(err.response.data === 'SequelizeUniqueConstraintError') {
            alert('User already present');

          }

        }
        
    }
return (
    <Card className={classes.auth}>
    <h1>Sign Up</h1>
<Form onSubmit={signUpHandler}>
    <Form.Group className={classes.control} controlId="name">
<Form.Label>Name</Form.Label>
<input ref={nameInputRef} required type="text" placeholder="Enter Name"  />
</Form.Group>
<Form.Group className={classes.control} controlId="email">
<Form.Label>Email address</Form.Label>
<input ref={emailInputRef} required type="email" placeholder="Enter email" />
</Form.Group>
<Form.Group className={classes.control} controlId="formBasicPhone">
<Form.Label>Phone Number</Form.Label>
<input ref={phoneInputRef} type="number" placeholder="Enter Phone Number" maxLength={10} required/>
</Form.Group>
<Form.Group className={classes.control} controlId="formBasicPassword">
<Form.Label>Password</Form.Label>
<input ref={passwordInputRef} type="password" placeholder="Password" required/>
</Form.Group>

<ButtonGroup  className={classes.actions} vertical>
{isLoading && <Button  className={classes.toggle} type="button">
  Sending Request
</Button>}
{!isLoading && <Button variant="primary" type="submit">
    Create Account
</Button> }
<Button  className={classes.toggle} onClick={switchAuthModeHandler} type="button">
    Login with existing account
</Button>
</ButtonGroup>
</Form>
</Card>
)
};

export default Signup;