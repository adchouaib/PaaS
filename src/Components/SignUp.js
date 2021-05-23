import React, { useState } from "react";
import { Redirect , Link} from "react-router-dom";
import {auth} from '../auth/firebase';

const SignUp = () => {
  const [currentUser,setcurrentUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = (event) => {
    event.preventDefault();
    const{ userEmail , userPassword } = event.target.elements;
    console.log(userEmail);
    auth
    .createUserWithEmailAndPassword(userEmail.value, userPassword.value).then(()=>{setcurrentUser(true);})
    .catch((error)=>{
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/weak-password') {
        setError('The password is too weak.');
      } else {
        setError(errorMessage);
      }
      console.log(error);
    });
    setEmail("");
    setPassword("");
  };
  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  if(currentUser){
    return <Redirect to="/home"/>;
  }
  return (
    <div className="mt-8">
      <h1 className="text-3xl mb-2 text-center font-bold">Sign Up</h1>
      <div className="border border-black mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        {error !== null && (
          <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
            {error}
          </div>
        )}
        <form className="" onSubmit={createUserWithEmailAndPasswordHandler}>
          <label htmlFor="userEmail" className="block">
            Email:
          </label>
          <input
            type="email"
            className="my-1 p-1 w-full"
            name="userEmail"
            value={email}
            placeholder="user@email.com"
            id="userEmail"
            onChange={event => onChangeHandler(event)}
          />
          <label htmlFor="userPassword" className="block">
            Password:
          </label>
          <input
            type="password"
            className="mt-1 mb-3 p-1 w-full"
            name="userPassword"
            value={password}
            placeholder="Your Password"
            id="userPassword"
            onChange={event => onChangeHandler(event)}
          />
          <button
             type="submit"
            className="bg-black hover:bg-gray-500 w-full py-2 text-white"
          >
            Sign up
          </button>
        </form>
        <p className="text-center my-3">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-600">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignUp;