import React from "react";
import image from "../assets/login.jpg";
import Footer from "../footer";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; 

const SigninSection = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const navigate = useNavigate();


  const handleSignup = (e) => {
  e.preventDefault();

  // Basic validation alert
  if (password.length < 8) {
    Swal.fire({
      icon: 'warning',
      title: 'Short Password',
      text: 'Password shuold be must 8 character!',
      background: '#0b0f1a', // Aapki app ka dark color
      color: '#fff',
      confirmButtonColor: '#3b82f6'
    });
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Sign Up Successful!',
        text: 'Your account has been created!',
        background: '#0b0f1a',
        color: '#fff',
        confirmButtonColor: '#22c55e',
        timer: 2500 // 2.5 seconds baad khud band ho jayega
      });
      navigate("/dashboard");
      
    })
    .catch((err) => {
      console.error("Error Code:", err.code);
      
      let errorMsg = err.message;
      if (err.code === "auth/email-already-in-use") {
        errorMsg = "This email is already registered!!";
      } else if (err.code === "auth/invalid-email") {
        errorMsg = "The email format is invalid!";
      }

      Swal.fire({
        icon: 'error',
        title: 'Signup Failed',
        text: errorMsg,
        background: '#0b0f1a',
        color: '#fff',
        confirmButtonColor: '#ef4444'
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
   <div className="flex flex-col min-h-screen bg-[#0b0f1a] overflow-x-hidden">

      {/* Login Content Area - Iski height manage ki hai taake footer neechay na jaye */}
      <section className="flex flex-1 flex-col lg:flex-row text-white overflow-hidden">
        {/* 1. Left Side: Image (Screenshot 574 style) */}
        <div className="w-full lg:w-1/2 h-48 lg:h-150 flex justify-start items-center bg-[#f7d34a]">
          <img
            src={image}
            alt="Illustration"
            className="w-full h-full object-cover lg:object-left"
          />
        </div>

        {/* 2. Right Side: Compact Glassmorphism Form (Screenshot 575 style) */}

        <div className="w-full lg:w-1/2 flex justify-center items-center p-6">
          <form onSubmit={handleSignup}>
            <div className="relative w-full max-w-sm p-6 rounded-[30px] border border-white/10 shadow-2xl bg-white/5 backdrop-blur-xl">
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>

              <h2 className="text-2xl font-bold text-center mb-4 tracking-tight text-white uppercase transition-all duration-300 hover:bg-linear-to-r hover:from-blue-400 hover:to-purple-500 hover:bg-clip-text hover:text-transparent cursor-default">
                SignUp
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
                  SignUp
                </button>

                <div className="flex flex-col items-center gap-1 text-[14px]">
                  <div className="text-gray-400">
                    Already have an account
                    <Link
                      to="/login"
                      className="text-blue-500 hover:underline cursor-pointer ml-1"
                    >
                      Login
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

export default SigninSection;
