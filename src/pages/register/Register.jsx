import React, { useState } from 'react'
import '../CSS/Authentication.css'
import { registerUserApi } from '../../apis/Api';
import { toast } from 'react-toastify';

const Register = () => {
    // Make a state variables - 5 States

    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // State for Error
    const [fullNameError, setFullNameError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // Make a function to save the state
    const handleFullName = (e) => {
        setFullName(e.target.value);
    };

    const handlePhone = (e) => {
        setPhone(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    // Validation
    var validate = () => {
        var isValid = true;
        if (fullName.trim() === "") {
            setFullNameError("Fullname is Required");
            isValid = false;
        }

        if (phone.trim() === "") {
            setPhoneError("Phone is Required");
            isValid = false;
        }

        if (email.trim() === "") {
            setEmailError("Email is Required");
            isValid = false;
        }

        if (password.trim() === "") {
            setPasswordError("Password is Required");
            isValid = false;
        }
        return isValid;
    };

    // For button
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        const isValid = validate();
        if (!isValid) {
            return;
        }

       
        const data = {
            fullName: fullName,
            phone: phone,
            email: email,
            password: password,
        };

        
        registerUserApi(data).then((res) => {
            //Sucess :true/false , message
            if (res.data.success === false) {
                toast.error(res.data.message);
            } else {
                toast.success(res.data.message);
            }
        });
    };
    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>Register</h1>
                <div className="loginsignup-fields">
                    <input
                        onChange={handleFullName}
                        type="text" placeholder='Full Name' />
                    {fullNameError && <p className="text-danger">{fullNameError}</p>}
                    <input
                        onChange={handlePhone}
                        type="text" placeholder='Phone' />
                    {phoneError && <p className="text-danger">{phoneError}</p>}
                    <input
                        onChange={handleEmail}
                        type="email" placeholder='Email Address' />
                    {emailError && <p className="text-danger">{emailError}</p>}
                    <input
                        onChange={handlePassword}
                        type="password" placeholder='Password' />
                    {passwordError && <p className="text-danger">{passwordError}</p>}
                </div>
                <button onClick={handleSubmit}>Continue</button>
                <p className="loginsignup-login">Already have an account? <a href="/login"><span>Login here</span></a></p>
            </div>
        </div>
    )
}
export default Register
