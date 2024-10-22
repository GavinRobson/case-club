'use client';

import { useState, useEffect } from 'react'
import Image from 'next/image';
import { motion } from 'framer-motion'

interface Skin {
  id: number;
  image: string;
}

const skins = [
  { id: 1, image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_sg556_so_purple_light_png.png" },
  { id: 2, image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_aug_hy_feathers_aug_light_png.png" },
  { id: 3, image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4a1_silencer_am_zebra_dark_light_png.png" }
]

const CrateOpening = () => {
  const [rolling, setRolling] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const startRoll = () => {
    setRolling(true);
    setSelectedItem(null)
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * skins.length);
      setSelectedItem(skins[randomIndex]);
      setRolling(false);
    }, 3000)
  }

  return ( 
    <div className='flex flex-col items-center justify-center p-6'>
      <div className='w-96 overflow-hidden border-2 border-gray-300 rounded-lg mb-4'>
        <motion.div 
          className="flex"
          animate={{ 
            x: rolling ? ['0%', '-100%', '-200%', '-100%'] : '0%',
           }}
          transition={{
            duration: 2.5,
            repeat: rolling ? Infinity : 0
          }}
        >
          {skins.map((skin, index) => (
            <div className='flex shrink-0 w-full text-center' key={index}>
              <Image src={skin.image} alt={'Skin'} width={200} height={200}/>
            </div>
          ))}

        </motion.div>
      </div>
      <button
        className={`px-6 py-2 text-lg font-semibold rounded-md ${rolling ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
        onClick={startRoll}
        disabled={rolling}
      >
        {rolling ? 'Rolling...' : 'Open Case'}
      </button>
      {selectedItem && !rolling && (
        <div className="mt-6 text-center">
          <h3 className="text-xl font-bold">You got: {selectedItem.name}</h3>
          <img className="w-48 h-48 mx-auto mt-2" src={selectedItem.image} alt={selectedItem.name} />
        </div>
      )}
    </div>
   );
}
 
export default CrateOpening;