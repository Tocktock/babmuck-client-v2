import React, { useState } from "react";
import MenuToggleBtn from "./MenuToggleBtn";
import Navigation from "./Navigation";
import Profile from "./Profile";
import MobileNavigation from "./MobileNavigation";
import LoginButton from "./LoginButton";
import Logo from "./Logo";
import { useSelector } from "react-redux";

interface Props {}

const Navbar: React.FC<Props> = (props) => {
  const { isAuthenticated, username, email } = useSelector(
    (state) => state.userState
  );
  return (
    <nav className="bg-autumnT-100 ">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <Logo />
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <MenuToggleBtn />
          </div>
          <Navigation />

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {isAuthenticated ? <Profile /> : <LoginButton />}
          </div>
        </div>
      </div>
      <MobileNavigation />
    </nav>
  );
};

export default Navbar;
