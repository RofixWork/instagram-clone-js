import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const Login = () => {
  const signin = () => {
    signInWithPopup(auth, provider).catch((err) => console.error(err));
  };
  return (
    <div className="h-[500px] grid place-items-center">
      <img src="/images/logo.png" className="w-[300px]" alt="" />
      <button
        onClick={signin}
        className="bg-blue-500 text-white capitalize px-5 py-2 rounded-md cursor-pointer font-semibold hover:bg-blue-600 transition-colors"
      >
        signin with google
      </button>
    </div>
  );
};

export default Login;
