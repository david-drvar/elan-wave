import React, {Component, useEffect, useState} from 'react';
import {Button, FormControl, Modal} from "react-bootstrap";
import PasswordStrengthBar from 'react-password-strength-bar';
import userService from "../services/users.service"
import toastService from "../services/toast.service"
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import Registration from "../components/Registration";
import Footer from "../components/Footer";
import {userActions} from "../store/actions/user.actions";
import { useDispatch, useSelector } from 'react-redux'


const Home = () =>  {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const store = useSelector(state => state)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useEffect(() => {
        document.title = "ElanWave library"
    }, [])

    const handleLogin = async () => {
        const response = await userService.login({
            username: username,
            password: password
        })
        if (response.status === 200) {
            toastService.show("success", "Successfully logged in!")
            dispatch(userActions.loginRequest({
                jwt: response.data.token,
                id: response.data.id,
                username: response.data.username
            }));
            history.push({pathname: '/library'})
        } else {
            toastService.show("error", "Username must be unique! Try again")
        }
    }

    return (
        <div>
            <div style={{backgroundColor : "#D6DBDF"}}>
                <br/><br/>
                <div style={{float : "right", marginRight : "40px"}}>
                    <input type={"text"} placeholder={"username"} onChange={(event => setUsername(event.target.value))} />
                    <input type={"password"} placeholder={"password"} style={{marginLeft : "10px"}} onChange={(event => setPassword(event.target.value))}/>
                    <Button variant="outline-secondary" style={{marginLeft : "10px"}} onClick={handleLogin}> Login</Button>
                    <p>
                    You don't have an account? <span style={{marginLeft: "3px"}}/>
                    <a onClick={handleShow} style={{ textDecoration: "underline", color : "#95A5A6"}}>Sign up!</a>
                    </p>
                </div>
                
                <div style={{marginLeft : "40px"}}>
                    <h2>Elan<span style={{color : "#E67E22"}}>Wave</span> bookstore</h2>
                </div>
                <br/>
                <hr/>
            </div>
            <br/>
            <div style={{height : "600px"}}>
                <p style={{textAlign: "left" , marginLeft : "200px", marginTop : "100px"}}>
                    Welcome to Elan<span style={{color : "#E67E22"}}>Wave</span> bookstore!
                    <br/>
                    <br/>
                    Here you can browse our book database, add new books, edit or delete the old ones.
                    Basically, <br/> you can do anything!
                    <br/>
                    <br/>
                    To browse the contents, please sign in, or sign up for an account if you don't have one.
                </p>
            </div>
            <Footer/>

            <Modal
                show={show}
                onHide={handleClose}
            >
                <Modal.Header>
                    <Modal.Title>Sign up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Registration/>
                </Modal.Body>
            </Modal>
        </div>
    );

}

export default Home;