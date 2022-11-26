import React from "react";

const Story = ({ username, avatar }) => {
  return (
    <div title={username} className="w-[45px] snap-center cursor-pointer">
      <div className="cursor-pointer mx-auto h-11 w-11 rounded-full border-[2px]  border-red-500 hover:scale-110 transition-transform overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={avatar}
          alt={username}
        />
      </div>
      <p className="text-center text-[11px] truncate">{username}</p>
    </div>
  );
};

export default Story;
