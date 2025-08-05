import React from "react";
import {useNavigate} from 'react-router-dom'

function StartButton(){
    const navigate = useNavigate();

    return(
        <button onClick={()=>navigate('/tasks')}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
            Start
        </button>
    );
}

export default StartButton;