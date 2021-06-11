import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firbase.config';
import {UserContext} from '../../App';
import { useHistory, useLocation } from 'react-router';
import './Login.css';
import Url from '../../Images/Bg.png';

firebase.initializeApp(firebaseConfig);

const Login = () => {
 const [loggedInUser, setLoggedInUser]  = useContext(UserContext);
 const [addNewUser, setAddNewUser] = useState(false);
 const [newUser, setNewUser] = useState({
     email: '',
     password: '',
     name:'', 
     error: '',
     success: false
 })
 console.log(newUser)
 const history = useHistory();
 const location = useLocation();
 let { from } = location.state || { from: { pathname: "/" } };

 ////////// google sign in ////////////////
    const handleGoggleSignIn = () =>{
       
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
            .then((result) => {
                var credential = result.credential;
                var token = credential.accessToken;
                const {displayName, email} = result.user;
                const signedInUser = {name: displayName, email: email}
                setLoggedInUser(signedInUser);
                history.push(from);
             
            }).catch((error) => {
               
                var errorCode = error.code;
                var errorMessage = error.message;
               
                var email = error.email;
               
                var credential = error.credential;
            
            });

    }
    const handleChange = (event) =>{
        console.log(event.target.name, event.target.value)
        let isFeildValid = true;
        if(event.target.name === 'email'){
            const isFeildValid = /\S+@\S+\.\S+/.test(event.target.value);
            console.log(isFeildValid);        }

        if(event.target.name === 'password'){
              const isPasswordValid = event.target.value.length > 6;
              const isPaswordHasNumber = /\d{1}/.test(event.target.value);
              isFeildValid= isPasswordValid && isPaswordHasNumber;
              console.log(isFeildValid);
        }

        if(isFeildValid){
            const newUserInfo = {...newUser};
            newUserInfo[event.target.name] = [event.target.value]
            setNewUser(newUserInfo);
        }
    }
    const handleSubmit = (e) =>{
        console.log(newUser.email, newUser.password)
         if( addNewUser && newUser.email && newUser.password){
            
            firebase.auth().createUserWithEmailAndPassword(newUser.email[0], newUser.password[0])
            .then(res =>{
                const newUserInfo = {...newUser};
                newUserInfo.error = '';
                newUserInfo.success = true;
                setNewUser(newUserInfo);
                console.log(res);
                history.push(from);
            })
            
             .catch((error) => {
                const errorMessage = error.message;
                const newUserInfo = {...newUser};
                newUserInfo.error = errorMessage;
                newUserInfo.success = false;
                setNewUser(newUserInfo);

            });
           
         }
         
         console.log('submitting')
         e.preventDefault();

         if(!addNewUser && newUser.email && newUser.password){
            firebase.auth().signInWithEmailAndPassword(newUser.email[0], newUser.password[0])
           .then(res => {
               console.log(" your response ",res);
               const newUserInfo = {...newUser};
               
                   newUserInfo.error = '';
                   newUserInfo.success = true;
                   setNewUser(newUserInfo);
                   const {email} = res.user;
                   const userEmail = {email: email}
                   setLoggedInUser(userEmail);
                   setLoggedInUser(newUserInfo);
                   history.push(from);
                  
           })
           .catch((error) => {
               const errorMessage = error.message;
               const newUserInfo = {...newUser};
               newUserInfo.error = errorMessage;
               newUserInfo.success = false;
               setNewUser(newUserInfo);
           });
          
   
       }
       
    }


    return (
        <div className='login header' style={{ backgroundImage: `url(${Url})` }}>
            
            <button onClick={handleGoggleSignIn} style={{background:'green', color: 'white' , borderRadius:'5px' , width:'150px', height:'50px'}}>Google sign</button><br /><br />
                {/* <h3>Your name: {newUser.name}</h3>
                <h3>Your email: {newUser.email}</h3>
                <h3>Your password: {newUser.password}</h3> */}
                
                <input style={{height:'20px', width:'20px'}} type="checkbox" onChange={() => setAddNewUser(!addNewUser)} name="addNewUser" id="" />
                <label htmlFor="addNewUser"><h3>Are you new user? Sign up</h3></label>
                <form onSubmit={handleSubmit} className='login-panel' action="">
                     <h1>Login</h1><br />
                     { addNewUser && <input onBlur={handleChange} type="text" name='name' style={{height:'30px', width:'300px', color: 'green'}} required placeholder="Username" />}<br /><br />
                     <input onBlur={handleChange} type="text" name='email' required placeholder="User email " style={{height:'30px', width:'300px'}}/><br /><br />
                     <input onBlur={handleChange} type="password" name='password' placeholder='User password' required style={{marginLeft:'6px', height:'30px', width:'300px'}} /> <br />
                     {/* <button type="submit" style={{background:'green', color: 'white' , borderRadius:'5px' , width:'70px', marginRight: '26px'}}>Submit</button><br /><br /> */}
                    <input type="submit" value="Submit" style={{background:'green', color: 'white' , borderRadius:'5px' , width:'70px', marginTop: '5px'}} />
                     
               </form>

               
               <h4 style={{color: 'red'}}>{newUser.error}</h4>

               {newUser.success &&  <h4 style={{color: 'green'}}>User {addNewUser? 'created' : 'logged in'} successfully!</h4> }
               
        </div>
    );
};

export default Login;