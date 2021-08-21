import React, { useState, useContext } from "react";
import { loginCall } from "../context/action";
import { AppContext } from "../context/context";

const Login = () => {
  const [username, setUsername] = useState("");
  const { dispatch } = useContext(AppContext);
  const submitHandler = (e) => {
    e.preventDefault();

    loginCall(username, dispatch);
  };
  return (
    <form onSubmit={submitHandler}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
      />
      <button type="submit">GO</button>
    </form>
  );
};

export default Login;
