import React from "react";

const UserSuggest = ({ username, avatar, company }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-x-2">
        <div className="h-10 w-10 overflow-hidden rounded-full hover:opacity-80 cursor-pointer">
          <img
            src={avatar}
            alt={username}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div>
          <h4 className="font-semibold text-sm">{username}</h4>
          <p className="text-[10.5px] text-gray-400 capitalize">
            work at {company}
          </p>
        </div>
      </div>
      <p className="text-blue-500 hover:text-blue-700 active:text-blue-700 text-xs cursor-pointer transition-colors">
        Follow
      </p>
    </div>
  );
};

export default UserSuggest;
