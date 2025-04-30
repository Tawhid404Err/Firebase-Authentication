import { app } from '../../config/firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';
import { useState } from 'react';
import {
  FaEye,
  FaEyeSlash,
  FaFacebook,
  FaGithub,
  FaGoogle,
} from 'react-icons/fa';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const LoginSignin = () => {
  const [passfield, setPassfield] = useState('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [displayUser, setDisplayUser] = useState(null);

  const signUpByGoogle = () => {
    signInWithPopup(auth, googleProvider).then((value) =>
      setDisplayUser(value.user.displayName)
    );
  };

  const signUpByGithub = () => {
    signInWithPopup(auth, githubProvider).then((value) =>
      setDisplayUser(value.user.displayName)
    );
  };

  const signUpByFacebook = () => {
    signInWithPopup(auth, facebookProvider).then((value) =>
      setDisplayUser(value.user.displayName)
    );
  };

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
      <div className="background-img flex h-dvh w-full flex-col items-center justify-center">
        {displayUser === null ? (
          <h1></h1>
        ) : (
          <h1 className="mb-4 text-[2rem] text-white">
            Wellcome {displayUser} 🎉✨
          </h1>
        )}
        <div className="flex h-[max-content] flex-col items-center rounded-[8px] border border-white/20 bg-white/10 px-8 py-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-[1px] select-none">
          <h1 className="text-[2rem] text-white">Connect with Us</h1>

          <div
            className="relative flex h-10 w-32 cursor-pointer items-center rounded-lg border border-[#dadadac0] bg-white/30 p-0.5"
            onClick={() => setIsActive(!isActive)}
          >
            <div
              className={`absolute flex h-8 w-1/2 items-center justify-center rounded-md border border-[#dadadac0] bg-blue-500 text-white transition-all duration-300 ease-in-out ${
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
              className="cursor-pointer rounded-[12px] border px-4 py-2 text-[1.05rem] text-white hover:bg-blue-500 [&>*]:border-[#dadadac0]"
            >
              {isActive ? 'Login' : 'Create user'}
            </button>
          </div>
          <div className="my-3 w-full border border-[#dadadac0]" />
          <div className="flex gap-2 [&>*]:flex [&>*]:cursor-pointer [&>*]:items-center [&>*]:gap-1 [&>*]:rounded-xl [&>*]:border [&>*]:border-[#dadadac0] [&>*]:px-2 [&>*]:py-2 [&>*]:text-[1.1rem] [&>*]:text-white [&>*]:transition [&>*]:delay-65 [&>*]:hover:bg-blue-500">
            <button onClick={signUpByGoogle}>
              <FaGoogle className="text-[1.5rem]" />
              google
            </button>
            <button onClick={signUpByGithub}>
              <FaGithub className="text-[1.5rem]" />
              GitHub
            </button>

            {/* <button onClick={signUpByFacebook}>
              <FaFacebook className="text-[1.5rem]" />
              Facebook
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignin;
