import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import Story from "./Story";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
const Stories = () => {
  const [suggestions, setSuggestions] = useState([]);
  // user info
  const [user] = useAuthState(auth);
  useEffect(() => {
    const users_suggestions = [...Array(20).keys()].map((_, index) => {
      return {
        id: index,
        username: faker.internet.userName(),
        avatar: faker.internet.avatar(),
        email: faker.internet.email(),
      };
    });

    setSuggestions(users_suggestions);
  }, []);
  return (
    <div className="flex items-center space-x-2 border border-gray-300 px-3 pt-2 pb-5 shadow-md bg-white rounded-sm overflow-x-auto overflow-y-hidden snap-proximity snap-x scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
      {/* user info = story */}
      {user && (
        <div
          title={user?.displayName}
          className="w-[45px] snap-center cursor-pointer"
        >
          <div className="cursor-pointer mx-auto h-11 w-11 rounded-full border-[2px]  border-red-500 hover:scale-110 transition-transform overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={user?.photoURL}
              alt={user?.displayName}
            />
          </div>
          <p className="text-center text-[11px] truncate">
            {user?.displayName}
          </p>
        </div>
      )}
      {/* user info = story */}
      {suggestions?.length
        ? suggestions?.map((suggest) => {
            return <Story key={suggest?.id} {...suggest} />;
          })
        : null}
    </div>
  );
};

export default Stories;
