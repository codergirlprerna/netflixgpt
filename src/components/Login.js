import React, { useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/Validate';

const Login = () => {
    const[isSignInForm,setIsSignInForm] = useState(true);

    const handleButtonClick = ()=>{
        //validate form data
        checkValidData(email,password);
    }

    const toggleSignInForm = ()=>{
        setIsSignInForm(!isSignInForm);
    };
  return (
    <div>
      <Header/>
      <div className='absolute'>      
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/bfc0fc46-24f6-4d70-85b3-7799315c01dd/web/IN-en-20240923-TRIFECTA-perspective_74e21c19-980e-45ef-bd6c-78c1a6ce9381_small.jpg" alt="logo/"/>
      </div>
      <form className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
      <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" :"Sign Up "}</h1>
      {!isSignInForm &&(
        <input type="text" placeholder="Full Name" className='p-4 my-4 w-full bg-gray-500'/>)}
      <input type="text" placeholder="email address" className='p-4 my-4 w-full bg-gray-500'/>
      <input type="password" placeholder='password' className='p-4 my-4 w-full bg-gray-500'/>
      <button className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick = {handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
      <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now": "Already Registered? Sign In Now"}</p>
      </form>

    </div>
  )
}

export default Login
