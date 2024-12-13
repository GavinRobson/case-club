import { Mail } from "lucide-react";
import { FiGithub } from "react-icons/fi";

// components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <div>
          <p>&copy; 2024 Your Company Name</p>
          <p>All Rights Reserved</p>
        </div>
        <div>
          <div className="flex flex-row space-x-2 items-center">
            <Mail size={20}/>
            <p>Contact: <a href="mailto:gavin.t.robson@gmail.com" className="text-blue-400">gavin.t.robson@gmail.com</a></p>
          </div>
          <div className="flex flex-row space-x-2 items-center">
            <FiGithub size={20}/>
            <p>GitHub: <a href="https://github.com/GavinRobson" target="_blank" className="text-blue-400">GavinRobson</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
