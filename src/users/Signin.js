import React, { useState } from "react";



const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleChangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    return (
        <div>
            <input type="text" value={username} onChange={handleChangeUsername} />
            <input type="password" value={password} onChange={handleChangePassword}/>
            <h1>Sign in</h1>
        </div>
    );
}



export default Signin;