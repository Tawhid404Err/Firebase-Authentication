import { app } from '../../config/firebase';
import { getAuth, signOut } from 'firebase/auth';

const Profile = () => {
  const auth = getAuth(app);
  console.log(auth);

  return (
    <div className="background-img flex h-dvh w-full flex-col items-center p-4">
      <div className="flex w-full items-center justify-between rounded-xl border border-white/20 bg-white/10 p-3 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-[1px]">
        <h1 className="text-[1.4rem] text-white">
          {auth.currentUser.displayName}
        </h1>
        <div className="flex h-full items-center gap-2">
          <span className="flex aspect-square h-[3rem] items-center justify-center overflow-hidden rounded-full bg-amber-400">
            <img src={auth.currentUser.photoURL} alt="Profile Picture" />
          </span>
          <button
            onClick={() => signOut(auth)}
            className="cursor-pointer rounded-[12px] border px-4 py-2 text-[1.05rem] text-white transition delay-75 hover:bg-blue-500 [&>*]:border-[#dadadac0]"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
