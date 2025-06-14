import React, { useState, useRef } from 'react';
import Header from './Header';
import { checkValidata } from '../utils/Validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { updateProfile } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { AVATAR_URL, BG_URL} from '../utils/constants';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    const message = checkValidata(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      // Sign up logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
          displayName: name.current.value, photoURL: AVATAR_URL
          }).then(() => {
          const { uid, email, displayName,photoURL } = user;
          dispatch(addUser({ uid, email, displayName,photoURL }));
          }).catch((error) => {
            setErrorMessage(error.message);
         });  
          console.log("Signed up:", user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(`${errorCode}: ${errorMessage}`);
        });
    } else {
      // Sign in logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(`${errorCode}: ${errorMessage}`);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className='absolute'>
        <img src={BG_URL} alt='logo'/>
      </div>
      <form onSubmit={(e) => e.preventDefault()} className='w-3/12 absolute p-12 bg-black/80 my-36 mx-auto right-0 left-0 text-white rounded-lg'>
        <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign in" : "Sign Up "}</h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder='Full Name'
            className='p-4 my-4 w-full bg-gray-700'
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder='email address'
          className='p-4 my-4 w-full bg-gray-700'
        />
        <input
          ref={password}
          type="password"
          placeholder='password'
          className='p-4 my-4 w-full bg-gray-700'
        />
        <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>
        <button className='my-6 p-4 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>
          {isSignInForm ? "Sign in" : "Sign Up"}
        </button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>
          {isSignInForm ? "New to Netflix? Sign Up Now" : "Already Registered. Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
