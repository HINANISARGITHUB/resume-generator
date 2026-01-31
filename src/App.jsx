// import React from 'react';
// import "./App.css";
// import { BrowserRouter, Routes, Route  } from "react-router-dom";
// import Navbar from './Navbar';
// import Hero from './Hero';
// import Feature from './feature';
// import Job from './Jobseeker';
// import Carrer from './Careerier';
// import Footer from './footer';
// import LearnMore from './LearnMore'
// import Login from './pages/login';
// import Signin from './pages/SignIn'

// const App = () => {
//   return (
//     <>
  
//    <BrowserRouter>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <>
//             <Navbar />
//               <Hero />
//               <Feature />
//               <Job />
//               <Carrer />
//               <Footer />
//             </>
//           }
//         />
//         <Route path="/learn" element={<LearnMore/>} />

//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signin/>} />

//       </Routes>

//     </BrowserRouter>
//     </>
//   )
// }

// export default App

import React from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Navbar';
import Hero from './Hero';
import Feature from './feature';
import Job from './Jobseeker';
import Carrer from './Careerier';
import Footer from './footer';
import LearnMore from './LearnMore';
import Login from './pages/login';
import Signin from './pages/SignIn';
import Dashboard from './pages/Dashboard'; // Import naye pages
import Editor from './pages/Editor';
import Preview from './pages/Preview';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* LANDING PAGE ROUTE */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <Feature />
              <Job />
              <Carrer />
              <Footer />
            </>
          }
        />

        {/* AUTH ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signin />} />
        <Route path="/learn" element={<LearnMore />} />

        {/* RESUME BUILDER ROUTES */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/preview/:id" element={<Preview />} /> 
        {/* :id isliye taake har resume ka apna unique preview link ho */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;

