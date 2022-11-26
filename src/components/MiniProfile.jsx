import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const MiniProfile = () => {
  const [user] = useAuthState(auth);
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-x-2">
        <div className="h-10 w-10 overflow-hidden rounded-full hover:opacity-80 cursor-pointer">
          <img
            src={user && user?.photoURL}
            alt="user image"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div>
          <h4
            title={user && user?.displayName}
            className="font-semibold text-sm truncate w-[100px]"
          >
            {user && user?.displayName}
          </h4>
          <p className="text-[10.5px] text-gray-400 capitalize">
            welcome to instagram
          </p>
        </div>
      </div>
      <p
        onClick={() => signOut(auth)}
        className="text-blue-500 hover:text-blue-700 active:text-blue-700 text-xs cursor-pointer transition-colors"
      >
        Sign Out
      </p>
    </div>
  );
};

export default MiniProfile;
