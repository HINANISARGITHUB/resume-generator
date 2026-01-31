import React from "react";
import image from "../assets/login.jpg";
import Footer from "../footer";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const LoginSection = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Success Alert - Theme matching Screenshot 575
        Swal.fire({
          title: "Login Successful!",
          text: "Welcome back to Resume Builder!",
          icon: "success",
          background: "#161b2c", // Dark Navy background
          color: "#fff",
          confirmButtonColor: "#2563eb", // Blue button
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error("Error Code:", err.code);

        let errorMsg = err.message;
        if (err.code === "auth/invalid-credential") {
          errorMsg = "Email or password error try again.";
        }

        // Error Alert - Theme matching your Tilted Red cards
        Swal.fire({
          title: "Login Failed",
          text: errorMsg,
          icon: "error",
          background: "#161b2c",
          color: "#fff",
          confirmButtonColor: "#dc2626", // Red color matching your theme
          customClass: {
            popup: "rounded-[30px] border border-white/10", // Glassmorphism look
          },
        });
      });
  };

  // 2. Google Login Functionality
  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        Swal.fire({
          title: "Welcome!",
          text: `Logged in as ${result.user.displayName}`,
          icon: "success",
          background: "#161b2c",
          color: "#fff",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/user");
      })
      .catch((error) => {
        Swal.fire({
          title: "Google Login Error",
          text: error.message,
          icon: "error",
          background: "#161b2c",
          color: "#fff",
          confirmButtonColor: "#dc2626",
        });
      });
  };
  return (
    // <div className="flex flex-col h-screen bg-[#0b0f1a] overflow-hidden">
    <div className="flex flex-col min-h-screen bg-[#0b0f1a] overflow-x-hidden">
      <section className="flex flex-1 flex-col lg:flex-row text-white overflow-hidden">
        {/* 1. Left Side */}
        {/* <div className="w-full lg:w-1/2 h-54 lg:h-full flex justify-start items-center bg-[#f7d34a]"> */}
        <div className="w-full lg:w-1/2 h-54 lg:h-150 flex justify-start items-center bg-[#f7d34a]">

          <img
            src={image}
            alt="Illustration"
            className="w-full h-full object-cover lg:object-left"
          />
        </div>

        {/* 2. Right Side: Compact Glassmorphism Form */}

        <div className="w-full lg:w-1/2 flex justify-center items-center p-6">
          <form onSubmit={handleLogin}>
            <div className="relative w-full max-w-sm p-6 rounded-[30px] border border-white/10 shadow-2xl bg-white/5 backdrop-blur-xl">
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>

              <h2 className="text-2xl font-bold text-center mb-4 tracking-tight text-white uppercase transition-all duration-300 hover:bg-linear-to-r hover:from-blue-400 hover:to-purple-500 hover:bg-clip-text hover:text-transparent cursor-default">
                Login
              </h2>

              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/10 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-500 text-sm"
                />

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/10 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-500 text-sm"
                />

                <button className="w-full bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-90 transition-all py-2 rounded-xl font-bold text-md shadow-lg shadow-blue-500/20 ">
                  Login
                </button>

                <div className="flex flex-col items-center gap-1 text-[14px]">
                  <div className="text-gray-400">
                    Don't have an account?
                    <Link
                      to="/signup"
                      className="text-blue-500 hover:underline cursor-pointer ml-1"
                    >
                      Signup
                    </Link>
                  </div>
                  <div className="text-blue-500 hover:underline cursor-pointer">
                    Forgot password? Reset Password
                  </div>
                </div>

                <button
                  onClick={handleGoogleLogin}
                  type="button"
                  className="w-full bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-90 transition-all py-2 rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg text-sm"
                >
                  <i className="fa-brands fa-google text-white"></i>
                  Continue with Google
                </button>
              </div>

              <p className="text-[14px] text-gray-400 text-center mt-4 leading-tight">
                Use any email (Password {">"} 8 characters). After signup/login
                you will choose a username.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Footer ab screen ke bottom par fix rahega */}
      <Footer />
    </div>
  );
};

export default LoginSection;

