import './App.css';

const Footer = () => {
  return (
    <footer className="bg-linear-to-r from-slate-900 to-slate-800 text-gray-300 py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Text */}
        <p className="text-sm text-center md:text-left">
          © 2026 Resume Builder. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex gap-5 text-lg">
          <a
            href="#"
            className="hover:text-blue-400 transition"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>

          <a
            href="#"
            className="hover:text-sky-400 transition"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter"></i>
          </a>

          <a
            href="#"
            className="hover:text-sky-400 transition"
            aria-label="GitHub"
          >
            <i className="fab fa-github"></i>
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

