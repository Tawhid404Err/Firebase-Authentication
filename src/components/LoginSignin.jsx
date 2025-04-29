import { app } from '../../config/firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const auth = getAuth(app);

const LoginSignin = () => {
  const [passfield, setPassfield] = useState('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(false);

  const createUser = () => {
    if (email === '' || password === '') {
      alert('Please Fill The Credentials');
    } else {
      if (!isActive) {
        createUserWithEmailAndPassword(auth, email, password)
          .then(() => {
            alert('User created Successfully');
            setEmail('');
            setPassword('');
          })
          .catch((error) => alert('Error: ' + error.message));
      } else {
        signInWithEmailAndPassword(auth, email, password)
          .then(() => {
            alert('User Logedin Successfully');
            setEmail('');
            setPassword('');
          })
          .catch((error) => alert('Error: ' + error.message));
      }
    }
  };

  const showHide = () => {
    if (passfield == 'password') {
      setPassfield('text');
    } else {
      setPassfield('password');
    }
  };

  return (
    <>
      <div className="background-img flex h-dvh w-full items-center justify-center select-none">
        <div className="flex h-[21rem] flex-col items-center rounded-[8px] border border-white/20 bg-white/10 px-8 py-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-[1px]">
          <h1 className="text-[2rem] text-white">Connect with Us</h1>

          <div
            className="relative flex h-10 w-32 cursor-pointer items-center rounded-lg border border-[#dadadac0] bg-blue-400/60 p-0.5"
            onClick={() => setIsActive(!isActive)}
          >
            <div
              className={`absolute flex h-8 w-1/2 items-center justify-center rounded-md border border-[#dadadac0] bg-blue-600 text-white transition-all duration-300 ease-in-out ${
                isActive ? 'left-15' : 'left-1'
              }`}
            >
              {isActive ? 'Login' : 'Signup'}
            </div>
            <div className="flex h-full w-full">
              <div className="flex h-full w-1/2 items-center justify-center">
                <span className={`${!isActive ? 'invisible' : 'text-white'}`}>
                  Signup
                </span>
              </div>
              <div className="flex h-full w-1/2 items-center justify-center">
                <span className={`${isActive ? 'invisible' : 'text-white'}`}>
                  Login
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex w-[18rem] flex-col items-center gap-3 [&>*]:border-[#dadadac0]">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your Email"
              className="h-[2.8rem] w-full rounded-2xl border px-2 text-white focus:outline-none"
            />
            <span className="flex w-full items-center gap-1 [&>*]:border-[#dadadac0]">
              <input
                type={passfield}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Enter your Password"
                className="h-[2.8rem] flex-1 rounded-2xl border px-2 text-white focus:outline-none"
              />
              <div
                onClick={showHide}
                className="flex h-[2.8rem] w-[2.8rem] cursor-pointer items-center justify-center rounded-[12px] border border-white"
              >
                {passfield == 'password' ? (
                  <FaEyeSlash className="size-[1.3rem] fill-[#fff]" />
                ) : (
                  <FaEye className="size-[1.3rem] fill-[#fff]" />
                )}
              </div>
            </span>
            <button
              onClick={createUser}
              className="cursor-pointer rounded-[12px] border bg-blue-500 px-4 py-2 text-white hover:text-[1.05rem] [&>*]:border-[#dadadac0]"
            >
              {isActive ? 'Login' : 'Create user'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignin;
