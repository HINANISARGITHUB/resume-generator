import "./App.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  // const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-between w-full px-8 lg:px-20 p-4 bg-black ">
      {/* Logo Section */}
      <div className="logo text-2xl font-bold">
        <h1 className=" text-2xl lg:text-3xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Resumify
        </h1>
      </div>

      {/* Login Button */}
      <div className="btnDiv">
        <Link to="/login" className="flex font-medium lg:text-[20px] px-4 py-2 rounded-md text-white transition hover:bg-linear-to-r hover:from-blue-400 hover:to-purple-500 hover:bg-clip-text hover:text-transparent">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
