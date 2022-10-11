import React, { useState } from "react";
import Axios from "axios";

function RegisterPage() {
  const [userReg, setUserReg] = useState("");
  const [passReg, setPassReg] = useState("");

  const Register = () => {
    Axios.post("http://localhost:4000/register", {
      username: userReg,
      password: passReg,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="App">
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Email"
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
      <button onClick={Register}>Register</button>
    </div>
  );
}

export default RegisterPage;
