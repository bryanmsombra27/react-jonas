import { useState } from "react";
import Search from "./Search";
import Logo from "./Logo";
import Results from "./Results";

const Navbar = ({ children }) => {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
};

export default Navbar;
