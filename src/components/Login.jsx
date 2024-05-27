import React, {useState} from "react";
import { userLogin } from "../axios/users";



export default function Login({setToken, setUser, token, user, navigate, setIsAdmin}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
   
    const  handleSubmit = async (ev) => {
        try {
        ev.preventDefault();
        const login = await userLogin({username, password});
        console.log('data', login.data);
        if (login.data.success === false) {
            console.log('Invalid Credentials');
            return;
        } 
        if(login.data.user.username === "admin") {
            console.log('Admin Logged In');
            setIsAdmin(true)
        }
        if(login.data.success === true) {
        window.localStorage.setItem('token', login.data.token);
        window.localStorage.setItem('user', JSON.stringify(login.data.user));
        const localToken = window.localStorage.getItem('token');
        const localUser = JSON.parse(window.localStorage.getItem('user'));
        await setToken(localToken);
        await setUser(localUser);
        console.log(window.localStorage.getItem('user'))
         //navigate('/home');
       
           }
        } catch (error) {
            console.log('ERROR AT LOGIN SUBMIT')
            console.error(error);
        }
    }
 
    return (<>
    <h1>Login</h1>
    <div>
            <form onSubmit={handleSubmit}>
            <div>
                <label className="form-label">Username</label>
                <input type="text" name="username" onChange={(ev)=> setUsername(ev.target.value)}  className="form-input" />
           </div>
                <br></br>
           <div>
                <label className="form-label">Password</label>
                <input type="password" name="password" onChange={(ev)=> setPassword(ev.target.value)} className="form-input" />
            </div>
            <button type="submit" className="btn btn-primary ms-4">Login</button>
            </form>
        </div>
  </>  );
    }