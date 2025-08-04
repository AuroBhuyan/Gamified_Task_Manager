import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

function login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () =>{
        const res = await fetch('http://localhost:5000/api/auth/login',{
            method: 'POST',
            headers: {'content-type':'application/json'},
            body: JSON>stringify({username,password}),
        });

        const data = await res.json();
        if(res.ok){
            localStorage.setItem('token',data.token);
            navigate('/dashboard');
        }else{
            alert(data.msg || 'login failed');
        }
    };
     
    return(
        <div>
            <h2>Login</h2>
            <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/>
            <input placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default login;
