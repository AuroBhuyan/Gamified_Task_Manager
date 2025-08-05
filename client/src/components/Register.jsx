import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

function Register(){
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async() =>{
        const res = await fetch('http://localhost:5000/api/auth/register',{
            method:'POST',
            header:{'content-type':'application/json'},
            body:JSON.stringify({username,password}),
        });
        if(res.ok)navigate('/');
    };

    return(
        <div>
            <h2>Register</h2>
            <input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)}/>
            <input placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}

export default Register;
