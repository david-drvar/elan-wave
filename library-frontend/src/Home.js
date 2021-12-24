import React, {Component, useEffect, useState} from 'react';
import {Button, FormControl, Modal} from "react-bootstrap";
import PasswordStrengthBar from 'react-password-strength-bar';
import userService from "../src/services/users.service"
import toastService from "../src/services/toast.service"
import {useHistory} from "react-router-dom";


const Home = () =>  {
    const [show, setShow] = useState(false);
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("");
    const [username, setUsername] = useState("");
    const [usernameErr, setUsernameErr] = useState("Enter username");
    const [passwordErr, setPasswordErr] = useState("Enter password");
    const [rePasswordErr, setRePasswordErr] = useState("Repeat password");
    const [submitted, setSubmitted] = useState(false);
    const [successfullyReg, setSuccessfullyReg] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const history = useHistory();


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        setUsernameErr( isUsernameValid(username) ? '' : 'Enter username')
        setRePasswordErr( isValidRepeatedPassword(rePassword) ? '' : 'This password must match the previous!')
        setPasswordErr(checkPassword(password) ? 'Password must contains at least 8 characters (lowercase letter, capital letter, number and special character) or not be a common password!' : '')
    }, [username,rePassword,password])

    async function submitForm (event) {
        setSubmitted(true);

        event.preventDefault();
        const errors = ['password','rePassword', 'username'];
        if (validateForm(errors)) {
            await sendParams()
        } else {
            console.log('Invalid Form')
        }
    }

    function validateForm(errors) {
        let valid = true;
        for(const Error of errors) {
            validationErrorMessage(createTarget(Error));
        }
        //todo promeniti!
        if(passwordErr !== "" ||  rePasswordErr !== "" || usernameErr !== "" )
            return !valid;
        return valid;
    }

    function createTarget (error) {
        return {target : {value : error, name : error}}
    }

    async function sendParams() {
        //setBirthDate(new Date(birthDate));

        const response = await userService.registerUser({
            username: username,
            password: password,
            userAccountID :"temp",
            isDeleted : false
        })
        if (response.status === 200) {
            toastService.show("success", "Successfully registered!Please log-in.")
            //alert("ok")
            setSuccessfullyReg(true)
            setDisabled(!disabled);
            //todo dispatch store
            history.push({pathname: '/library'})
        } else {
            //alert("error")
            toastService.show("error", "E-mail address and username must be unique! Try again")
        }
    }

    const handleInputChange = (event) => {
        const target = event.target;
        switch (target.name) {
            case "password" :
                setPassword(target.value);
                break;
            case "rePassword" :
                setRePassword(target.value);
                break;
            case "username" :
                setUsername(target.value);
                break;
        }
        validationErrorMessage(event);
    }

    function validationErrorMessage(event) {
        const { name } = event.target;

        switch (name) {
            case 'password':
                setPasswordErr(checkPassword(password) ? 'Password must contains at least 8 characters (lowercase letter, capital letter, number and special character) or not be a common password!' : '')
                break;
            case 'rePassword':
                setRePasswordErr( isValidRepeatedPassword(rePassword) ? '' : 'This password must match the previous!')
                break;
            case 'username':
                setUsernameErr( isUsernameValid(username) ? '' : 'Enter username')
                break;
            default:
                /*this.setState({
                    validForm: true
                })*/
                break;
        }
    }

    function isUsernameValid(value) {
        return /^[a-z0-9_.]+$/.test(value);
    }

    function checkPassword (password) {
        console.log("Checking")
        if(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(password)){
            setPasswordStrength(password);
            return false;
        } else {
            setPasswordStrength("");
            return true;
        }
    }

    function isValidRepeatedPassword (value)  {
        return password === rePassword;
    }

    return (
        <div>
            <div style={{backgroundColor : "#D6DBDF"}}>
                <br/><br/>
                <input type={"text"} placeholder={"username"} />
                <input type={"password"} placeholder={"password"} style={{marginLeft : "10px"}}/>
                <Button variant="outline-secondary" style={{marginLeft : "10px"}}> Login</Button>
                <p>
                    You don't have an account? <span style={{marginLeft: "3px"}}/>
                    <a onClick={handleShow} style={{ textDecoration: "underline", color : "#95A5A6"}}>Sign up!</a>
                </p>
                <h2>Elan<span style={{color : "#E67E22"}}>Wave</span> bookstore</h2>
                <br/>
                <hr/>
            </div>
            <br/>
            <div>
                <p style={{textAlign: "left" , marginLeft : "200px", marginTop : "100px"}}>
                    Welcome to Elan<span style={{color : "#E67E22"}}>Wave</span> bookstore!
                    <br/>
                    Here you can browse our book database, add new books, edit or delete the old ones.
                    Basically, <br/> you can do anything!
                    <br/>
                    To browse the contents, please sign in, or sign up for an account if you don't have one.
                </p>
                <hr/>
            </div>
            <div style={{backgroundColor : "#808B96", height : "100px", margin : "auto"}}>
                <a href="https://www.elanwave.com" style={{color : "#2C3E50"}}>www.elanwave.com </a>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                style={{height : "6400px"}}
            >
                <Modal.Header>
                    <Modal.Title>Sign up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row" style={{marginTop: '1rem'}}>
                        <label  className="col-sm-2 col-form-label">Username *</label>
                        <div className="col-sm-6 mb-2">
                            <input  disabled = {(disabled)? "disabled" : ""}   type="text" value={username} name="username" onChange={(e) => handleInputChange(e) } className="form-control" id="username" />
                            {submitted && usernameErr.length > 0 && <span className="text-danger">{usernameErr}</span>}

                        </div>
                        <div className="col-sm-4">
                        </div>
                    </div>
                    <div className="row" style={{marginTop: '1rem'}}>
                        <label className="col-sm-2 col-form-label">Password *</label>
                        <div className="col-sm-6 mb-2">
                            <FormControl disabled = {(disabled)? "disabled" : ""}  name="password" type="password" placeholder="Password"  value={password} onChange={(e) => handleInputChange(e) }/>
                            {submitted && passwordErr.length > 0 &&  <span className="text-danger">{passwordErr}</span>}
                            <PasswordStrengthBar password={passwordStrength} />
                        </div>
                        <div className="col-sm-4">
                        </div>
                    </div>

                    <div className="row" style={{marginTop: '1rem'}}>
                        <label  className="col-sm-2 col-form-label">Repeat password *</label>
                        <div className="col-sm-6 mb-2">
                            <FormControl  disabled = {(disabled)? "disabled" : ""}  name="rePassword" type="password" placeholder="Repeat new Password" value={rePassword} onChange={(e) => handleInputChange(e) }/>
                            {submitted && rePasswordErr.length > 0 &&  <span className="text-danger">{rePasswordErr}</span>}

                        </div>
                        <div className="col-sm-4">
                        </div>
                    </div>

                    {/*{*/}
                    {/*    !successfullyReg &&*/}
                    {/*    <div className="row" style={{marginTop: '1rem'}}>*/}
                    {/*        <div className="col-sm-5 mb-2">*/}
                    {/*        </div>*/}
                    {/*        <div className="col-sm-4">*/}
                    {/*            <Button variant="success" onClick={submitForm}>Confirm</Button>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*}*/}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={submitForm}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );

}

export default Home;