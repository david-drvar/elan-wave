import React, {useEffect, useState} from 'react';
import {Button, FormControl} from "react-bootstrap";
import PasswordStrengthBar from "react-password-strength-bar";
import {useHistory} from "react-router-dom";
import userService from "../services/users.service";
import toastService from "../services/toast.service";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../store/actions/user.actions";
import authenticationService from '../services/authentication.service';


const Registration = () => {
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("");
    const [username, setUsername] = useState("");
    const [usernameErr, setUsernameErr] = useState("Enter username");
    const [passwordErr, setPasswordErr] = useState("Enter password");
    const [rePasswordErr, setRePasswordErr] = useState("Repeat password");
    const [disabled, setDisabled] = useState(false);

    const dispatch = useDispatch();
    const store = useSelector(state => state)

    const history = useHistory();

    const submitForm = async (event) => {
        event.preventDefault();
        const errors = ['password','rePassword', 'username'];
        if (validateForm(errors)) {
            await sendParams()
        } else {
            console.log('Invalid Form')
        }
    }

    const validateForm = (errors) => {
        let valid = true;
        for(const Error of errors) {
            validationErrorMessage(createTarget(Error));
        }
        if(passwordErr !== "" ||  rePasswordErr !== "" || usernameErr !== "" )
            return !valid;
        return valid;
    }

    const createTarget = (error) => {
        return {target : {value : error, name : error}}
    }

    const sendParams = async () => {
        const response = await authenticationService.registerUser({
            username: username,
            password: password
        })
        if (response.status === 200) {
            toastService.show("success", "Successfully registered!Please log-in.")
            setDisabled(!disabled);
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
        //validationErrorMessage(event);
    }

    const validationErrorMessage = (event) => {
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
                //setUsernameErr( isUsernameUnique(username) ? '' : "Username must be unique")
                break;
            default:
                break;
        }
    }

    const isUsernameValid = (value) => {
        return /^[a-z0-9_.-]+$/.test(value);
    }

    const isUsernameUnique =  async (username) => {
        const response =  await userService.isUsernameUnique(username, store.user.jwt)
        console.log("response")
        console.log(response.data)
        
        return response.data.status
    }

    const checkPassword =  (password) => {
        if(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(password)){
            setPasswordStrength(password);
            return false;
        } else {
            setPasswordStrength("");
            return true;
        }
    }

    const isValidRepeatedPassword = (value) =>  {
        return password === rePassword;
    }
    return (
        <div>
            <div className="row" style={{marginTop: '1rem'}}>
                <label  className="col-sm-2 col-form-label">Username *</label>
                <div className="col-sm-6 mb-2">
                    <input  disabled = {(disabled)? "disabled" : ""}   type="text" value={username} name="username" onChange={(e) => handleInputChange(e) } onBlur={validationErrorMessage} className="form-control" id="username" />
                    {usernameErr.length > 0 && <span className="text-danger">{usernameErr}</span>}

                </div>
                <div className="col-sm-4">
                </div>
            </div>
            <div className="row" style={{marginTop: '1rem'}}>
                <label className="col-sm-2 col-form-label">Password *</label>
                <div className="col-sm-6 mb-2">
                    <FormControl disabled = {(disabled)? "disabled" : ""}  name="password" type="password" placeholder="Password"  value={password} onChange={(e) => handleInputChange(e) } onBlur={validationErrorMessage}/>
                    {passwordErr.length > 0 &&  <span className="text-danger">{passwordErr}</span>}
                    <PasswordStrengthBar password={passwordStrength} />
                </div>
                <div className="col-sm-4">
                </div>
            </div>

            <div className="row" style={{marginTop: '1rem'}}>
                <label  className="col-sm-2 col-form-label">Repeat password *</label>
                <div className="col-sm-6 mb-2">
                    <FormControl  disabled = {(disabled)? "disabled" : ""}  name="rePassword" type="password" placeholder="Repeat new Password" value={rePassword} onChange={(e) => handleInputChange(e) } onBlur={validationErrorMessage} />
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