import React, {useState,useContext} from "react";
import { Link,Redirect } from "react-router-dom";
import { AuthContext } from "../auth/auth";
import {auth} from "../auth/firebase";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const signInWithEmailAndPasswordHandler = 
            (event) => {
                event.preventDefault();
                const {userEmail,userPassword}=event.target.elements;
                auth.signInWithEmailAndPassword(userEmail.value,userPassword.value).catch((err)=>{setError(err.message)});           
    };

    const onChangeHandler = (event) => {
      const {name, value} = event.currentTarget;
      if(name === 'userEmail') {
        setEmail(value);
      }
      else if(name === 'userPassword'){
        setPassword(value);
      }
    };

  const { currentUser } = useContext(AuthContext);
    if (currentUser) {
      return <Redirect to="/home" />;
    }
  return (
    <div className="mt-8">
      <h1 className="text-3xl mb-2 text-center font-bold">Login</h1>
      <div className="border border-black mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        {error !== null && <div className = "py-4 bg-red-600 w-full text-white text-center mb-3">{error}</div>}
        <form className="" onSubmit={signInWithEmailAndPasswordHandler}>
          <label htmlFor="userEmail" className="block">
            Email:
          </label>
          <input
            type="email"
            className="my-1 p-1 w-full"
            name="userEmail"
            value = {email}
            placeholder="user@mail.com"
            id="userEmail"
            onChange = {(event) => onChangeHandler(event)}
          />
          <label htmlFor="userPassword" className="block">
            Password:
          </label>
          <input
            type="password"
            className="mt-1 mb-3 p-1 w-full"
            name="userPassword"
            value = {password}
            placeholder="Your Password"
            id="userPassword"
            onChange = {(event) => onChangeHandler(event)}
          />
          <button className="bg-black hover:bg-gray-500 w-full py-2 text-white" type="submit">
            Sign in
          </button>
        </form>
        <p className="text-center my-3">
          Don't have an account?{" "}
          <Link to="/signUp" className="text-blue-500 hover:text-blue-600">
            Sign up here
          </Link>{" "}
          <br />{" "}
        </p>
      </div>
    </div>
  );
};
export default Login;