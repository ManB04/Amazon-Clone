import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './Login.css'
import {auth} from './firebase.js';

function Login() {
    // it allows us to programitically change the url
    const history=useHistory();

    //setting empty strings for email and password
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');

    //indicates after clicking Sign In button/Enter key in keyboard what should happen where 'e' is the event
    const signIn = e =>{
        e.preventDefault(); //prevents default refresh which is default feature in react
        
        //login using firebase
        auth.signInWithEmailAndPassword(email,password).then((auth) =>{
            if(auth){
                history.push('/');
            }
        }).catch(error => alert(error.message))
    
    }
    const register= e =>{
        e.preventDefault();

        //register using firebase
        
        // with auth variable and createUserWithEmailAndPassword function, we will create a new user by passing previously declared const email and password(createUserWithEmailAndPassword(email,password))
        auth.createUserWithEmailAndPassword(email, password).then((auth) => {
            //with the returned object if proper details are filled, it successfully creates a new user with emil and password
            // console.log(auth);
            //if we get valid authentication i.e if a valid new user is created then with the help of history we can redirect to home page
            if(auth){
                history.push('/');
            }
        }).catch(
            //in case if there is any mistake while creating account it will throw an error
            error => alert(error.message));
    }

    return (
        <div className='login'>
            <Link to='/'>
            <img
                className="login__logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"    
            />
            </Link>
            <div className='login__container'>
                <h1>Sign-in</h1>
                <form>
                    <h5>E-mail</h5>
                    
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)}/>
                    {/*
                    value- actual value for input text
                    onChange-it will set an event, in this case 'e' is the event and whatever is typed on input text will be passed to setEmail(),setPassword() which will in turn be passes to email/password i.e to the value
                    */}
                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>
                    {/* 
                    onClick- indicates what should happen upon clicking the button/pressing enter in keyboard
                    type- indicates that we should submit details in input as per onClick
                    */}
                    <button type='submit'  onClick={signIn}className='login__signInButton'>Sign In</button>
                </form>
                <button 
                onClick={register}
                className='login__registerButton'>Create new Account</button>
                <p>
                    By signing-in you agree to the Amazon Fake Clone conditions of use & Sale.Please see out Privacy Notice, our cookies Notice and our Interest-Based Ads Notice
                </p>
            </div>
        </div>
    )
}

export default Login
