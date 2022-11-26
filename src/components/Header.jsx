import React from "react";
import { BsInstagram } from "react-icons/bs";
import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import {
  HeartIcon,
  PlusCircleIcon,
  PaperAirplaneIcon,
  UserGroupIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalState";
const Header = () => {
  const [user] = useAuthState(auth);

  // modal
  const [open, setOpen] = useRecoilState(modalState);

  return (
    <header className="py-1 px-3 shadow-sm bg-white sticky top-0 z-[999]">
      {/* main */}
      <div className="flex justify-between items-center container">
        {/* logo */}
        <div>
          <h1 className="font-logo text-[1.7rem] font-normal cursor-pointer hidden md:block">
            instagram
          </h1>
          <BsInstagram className="text-3xl md:hidden " />
        </div>
        {/*  search input*/}
        <div className="w-[200px] flex items-center py-[5px] gap-x-2 px-2 bg-gray-50 opacity-90 border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-gray-900">
          <MagnifyingGlassIcon className="h-4 w-4" />
          <input
            type="text"
            placeholder="Search"
            className="outline-none flex-1 text-[13px] bg-transparent"
          />
        </div>
        {/* icons */}
        <div className="flex items-center space-x-4">
          <Bars3Icon className="h-6 cursor-pointer block sm:hidden" />
          {user ? (
            <>
              <HomeIcon className="nav_icon" />
              <div className="relative hidden sm:block">
                <PaperAirplaneIcon className="nav_icon transform -rotate-45" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[11px] font-semibold grid place-items-center animate-pulse">
                  3
                </div>
              </div>
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="nav_icon"
              />
              <UserGroupIcon className="nav_icon" />
              <HeartIcon className="nav_icon" />
              {/* user image */}
              {user && (
                <img
                  onClick={() => signOut(auth)}
                  src={user?.photoURL}
                  alt="user image"
                  className="inline-block h-8 w-8 cursor-pointer rounded-full object-cover object-center hover:opacity-90 transition-opacity overflow-hidden"
                />
              )}
            </>
          ) : (
            <>
              <p
                onClick={() => signInWithPopup(auth, provider)}
                className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer transition-colors"
              >
                Sign In
              </p>
            </>
          )}
        </div>
      </div>
      {/* main */}
    </header>
  );
};

export default Header;
