import React, { useState } from "react";
import Axios from "axios";

function Login() {
  const [userReg, setUserReg] = useState("");
  const [passReg, setPassReg] = useState("");

  const register = () => {
    Axios.post("http://localhost:3000/register", {
      username: userReg,
      password: passReg,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="App">
      <div className="Register">
        <h1>Register</h1>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setUserReg(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassReg(e.target.value);
          }}
        />
        <button onClick={register}>Register</button>
      </div>
      <div className="Login">
        <h1>Login</h1>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>Login</button>
      </div>
    </div>
  );
}

export default Login;
