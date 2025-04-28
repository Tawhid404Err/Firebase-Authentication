import { app } from "../config/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const auth = getAuth(app);

const App = () => {
  const [passfield, setPassfiled] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createUser = () => {
    if (email === "" || password === "") {
      alert("Please Fill The Credentials");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          alert("User created Successfully");
          setEmail("");
          setPassword("");
        })
        .catch((error) => alert("Error: " + error.message));
    }
  };

  const showHide = () => {
    if (passfield == "password") {
      setPassfiled("text");
    } else {
      setPassfiled("password");
    }
  };

  return (
    <>
      <div className="background-img select-none flex justify-center items-center h-dvh w-full">
        <div className="flex flex-col h-[17rem] items-center rounded-[8px] px-8 py-8 bg-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-[1px] border border-white/20">
          <h1 className="text-[2rem] text-white">Connect with Us</h1>
          <div className="flex [&>*]:border-[#dadada] flex-col w-[18rem] items-center gap-3 mt-4">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your Email"
              className="focus:outline-none text-white border w-full h-[2.8rem] rounded-2xl px-2"
            />
            <span className="flex [&>*]:border-[#dadada] w-full items-center gap-1">
              <input
                type={passfield}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Enter your Password"
                className="focus:outline-none text-white border flex-1 h-[2.8rem] rounded-2xl px-2"
              />
              <div
                onClick={showHide}
                className="border cursor-pointer border-white rounded-[12px] h-[2.8rem] w-[2.8rem] flex items-center justify-center"
              >
                {passfield == "password" ? (
                  <FaEyeSlash className="size-[1.3rem] fill-[#fff]" />
                ) : (
                  <FaEye className="size-[1.3rem] fill-[#fff]" />
                )}
              </div>
            </span>
            <button
              onClick={createUser}
              className="border [&>*]:border-[#dadada] px-4 py-2 rounded-[12px] cursor-pointer text-white bg-blue-500 hover:text-[1.05rem]"
            >
              Create user
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
