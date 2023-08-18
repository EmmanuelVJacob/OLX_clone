import React, { useState } from 'react';
import {signInWithEmailAndPassword,getAuth} from 'firebase/auth'
import Logo from '../../olx-logo.png';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import firebase from '../../firebase/config';

function Login() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [errMsg,setErrMsg] = useState('')
  const navigate = useNavigate()
  const handleLogin = (e)=>{
    e.preventDefault();
    const auth = getAuth(firebase)
    signInWithEmailAndPassword(auth,email,password)
    .then(()=>{
      navigate('/')
    })
    .catch((err)=>{
      console.log(err.message);
      let error = err.message.split("/")[1].split(")")[0].trim();
      setErrMsg(error)
      setTimeout(() => {
        setErrMsg('')
      }, 3000);
    })
  }


  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt=''></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            value={email}
            type="email"
            id="fname"
            name="email"
           onChange={(e)=>{setEmail(e.target.value)}}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
           
          />
          <br />
          <br />
          {errMsg ? <div style={{color:'red'}} id='errMsg' >{errMsg}</div> : null}
          <button>Login</button>
        </form>
        <a onClick={(e)=>{e.preventDefault(); navigate('/signup')}} href='/signup'>Signup</a>
      </div>
    </div>
  );
}

export default Login;
