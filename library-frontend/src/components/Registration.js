import React, {useEffect, useState} from 'react';
import {Button, FormControl} from "react-bootstrap";
import PasswordStrengthBar from "react-password-strength-bar";
import {useHistory} from "react-router-dom";
import userService from "../services/users.service";
import toastService from "../services/toast.service";


const Registration = () => {
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("");
    const [username, setUsername] = useState("");
    const [usernameErr, setUsernameErr] = useState("Enter username");
    const [passwordErr, setPasswordErr] = useState("Enter password");
    const [rePasswordErr, setRePasswordErr] = useState("Repeat password");
    const [disabled, setDisabled] = useState(false);

    const history = useHistory();


    useEffect(() => {
        setUsernameErr( isUsernameValid(username) ? '' : 'Enter username')
        setRePasswordErr( isValidRepeatedPassword(rePassword) ? '' : 'This password must match the previous!')
        setPasswordErr(checkPassword(password) ? 'Password must contains at least 8 characters (lowercase letter, capital letter, number and special character) or not be a common password!' : '')
    }, [username,rePassword,password])

    async function submitForm (event) {

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
            setDisabled(!disabled);
            //todo dispatch store
            history.push({pathname: '/library'})
        } else {
            toastService.show("error", "Username must be unique! Try again")
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

    function validationErrorMessageBlur(event) {
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
            <div className="row" style={{marginTop: '1rem'}}>
                <label  className="col-sm-2 col-form-label">Username *</label>
                <div className="col-sm-6 mb-2">
                    <input  disabled = {(disabled)? "disabled" : ""}   type="text" value={username} name="username" onChange={(e) => handleInputChange(e) } onBlur={validationErrorMessageBlur} className="form-control" id="username" />
                    {usernameErr.length > 0 && <span className="text-danger">{usernameErr}</span>}

                </div>
                <div className="col-sm-4">
                </div>
            </div>
            <div className="row" style={{marginTop: '1rem'}}>
                <label className="col-sm-2 col-form-label">Password *</label>
                <div className="col-sm-6 mb-2">
                    <FormControl disabled = {(disabled)? "disabled" : ""}  name="password" type="password" placeholder="Password"  value={password} onChange={(e) => handleInputChange(e) } onBlur={validationErrorMessageBlur}/>
                    {passwordErr.length > 0 &&  <span className="text-danger">{passwordErr}</span>}
                    <PasswordStrengthBar password={passwordStrength} />
                </div>
                <div className="col-sm-4">
                </div>
            </div>

            <div className="row" style={{marginTop: '1rem'}}>
                <label  className="col-sm-2 col-form-label">Repeat password *</label>
                <div className="col-sm-6 mb-2">
                    <FormControl  disabled = {(disabled)? "disabled" : ""}  name="rePassword" type="password" placeholder="Repeat new Password" value={rePassword} onChange={(e) => handleInputChange(e) } onBlur={validationErrorMessageBlur} />
                    {rePasswordErr.length > 0 &&  <span className="text-danger">{rePasswordErr}</span>}

                </div>
                <div className="col-sm-4">
                </div>
            </div>


            <div className="row" style={{marginTop: '1rem'}}>
                <div className="col-sm-5 mb-2">
                </div>
                <div className="col-sm-4">
                    <Button variant="success" onClick={submitForm}>Confirm</Button>
                </div>
            </div>
        </div>
    )
}

export default Registration;