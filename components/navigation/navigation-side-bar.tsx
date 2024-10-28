'use client';

import { Menu } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import MobileNavigation from "@/components/navigation/mobile-navigation";

const NavigationSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return ( 
    <div className="px-4 z-50">
      <button 
      onClick={toggleMenu}
        className="p-2 h-full flex items-center text-white"
      >
        <Menu size={30}/>
      </button>
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="absolute top-0 left-0 w-64 h-screen bg-gray-800 text-white"
        onClick={toggleMenu}
      >
        <div className="pt-4 flex w-full items-center justify-center">
          <Menu size={30} onClick={toggleMenu} />
        </div>
        <div className="pt-2 px-2">
          <MobileNavigation />
        </div>
      </motion.div>
    </div>
   );
}
 
export default NavigationSideBar;