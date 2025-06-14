import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';

import { auth } from '../utils/firebase';
import { addUser, removeUser } from '../utils/userSlice';
import { toggleGptSearchView } from '../utils/gptSlice';
import { AVATAR_URL, LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import lang from '../utils/LanguageConstants';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store) => store.user);
  const showGptSearch= useSelector((store)=>store.gpt.showGptSearch)

  // ✅ Handle sign out
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch(() => {
        navigate('/');
      });
  };

  // ✅ Handle GPT Search Toggle
  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e)=>{
    dispatch(changeLanguage(e.target.value));
  }

  // ✅ Listen to auth state and redirect accordingly
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        if (location.pathname === '/') navigate('/browse');
      } else {
        dispatch(removeUser());
        if (location.pathname !== '/') navigate('/');
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate, location]);

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black flex justify-between z-10'>
      <img className='w-44' src={LOGO} alt='logo' />

      {user && (
        <div className='flex items-center gap-4'>
         { showGptSearch && <select className='p-2 m-2 bg-gray-900 text-white' onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map((lang)=>(
              <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
            ))}
          </select>}
          <button
            onClick={handleGptSearchClick}
            className='py-2 px-4 bg-purple-800 text-white rounded-lg hover:bg-purple-700 transition'
          >
            {showGptSearch ? "Homepage":"GPT Search"}
          </button>
          <img
            className='w-12 h-12 rounded-full'
            src={user?.photoURL || AVATAR_URL}
            alt='usericon'
          />
          <button
            onClick={handleSignOut}
            className='text-white font-bold hover:underline'
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
