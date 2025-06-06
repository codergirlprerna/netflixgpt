import React, { useState } from 'react'
import Header from './Header'

const Login = () => {
  const [isSignInForm,setIsSignInForm] = useState(true);
  const toggleSignInForm=()=>{
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header/>
      <div className='absolute'>
        <img src='https://assets.nflxext.com/ffe/siteui/vlv3/c933529f-8ac1-4289-a113-b89a47b45391/web_tall_panel/IN-en-20250602-TRIFECTA-perspective_b308c7e2-45d3-4dc6-aae0-ee020c0e3afc_large.jpg' alt='logo'/>
      </div>
      <form className=' w-3/12 absolute p-12 bg-black/80 my-36 mx-auto right-0 left-0 text-white rounded-lg '>
      <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign in" : "Sign Up "}</h1>
        {!isSignInForm && ( <input type="text"placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700'/>)  }
        <input type="text" placeholder='email address' className='p-4 my-4  w-full bg-gray-700'></input>
        <input type="password" placeholder='password' className='p-4 my-4  w-full bg-gray-700'></input>
        <button className='my-6 p-4 bg-red-700 w-full rounded-lg'>{isSignInForm ? "Sign in" : "Sign Up "}</button>
        <p className='py-4 cursor-pointer'  onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already Registered. Sign In Now "}</p>
      </form>
    </div>
  )
}

export default Login
