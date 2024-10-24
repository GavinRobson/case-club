'use client';

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SkinImage from './skin-image';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import weighSkins from '@/functions/weigh-skins';
import { useRef } from 'react'
import { Volume2, VolumeOff } from 'lucide-react';

const CrateOpening = ({ skins }: { skins: any }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [muted, setMuted] = useState(false);
  const [rollState, setRollState] = useState({rolling: false, rolled: false});
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [imagesArr, setImagesArr] = useState<any>(null);
  const [land, setLand] = useState(0);
  const [audio, setAudio] = useState('');
  const [goAudio, setGoAudio] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const weightedSkins = weighSkins(skins);

  let numKnives = 0;
  skins.map((skin: any) => {
    if (skin.category === 'Knives' || skin.category === 'Gloves') {
      numKnives++;
    }
  })

  let weaponSkins: any = [];
  skins.map((skin: any) => {
    if (skin.category === 'Knives' || skin.category === 'Gloves') {
      null;
    } else {
      weaponSkins.push(skin)
    }

  })

  const changeMute = () => {
    setMuted(!muted);
  }

  useEffect(() => {
    if (!muted) {
      if (audioRef.current) {
        
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    
}
  }, [goAudio, muted])

  const startRoll = () => {
    setRollState({ rolling: false, rolled: false })
    setSelectedItem(null);

    const wonSkin = getWonSkin(weightedSkins, 100000);
    const landNum = 965 + Math.floor(Math.random() * 19);
    setLand(landNum)

    const images = getImages(wonSkin);
    setImagesArr(images);

    setRollState({rolling: true, rolled: false});

    if (wonSkin.rarity_name === 'Extraordinary') {
      setGoAudio(!goAudio);
      setAudio('/sfx/knife_win.mp3')
    } else {
      setGoAudio(!goAudio);
      setAudio('/sfx/mil_spec_win.mp3')
    }

    setTimeout(() => {
      setRollState({rolling: false, rolled: true}) 
      setSelectedItem(wonSkin)
  } , 6000);
  }
  
  function getWonSkin(skins: any, odds: number) {
    const random = Math.floor(Math.random() * odds);
    let wonSkin = null;
    for (let i = 0; i < skins.length; i++) {
      if (random >= skins[i].min_odds && random <= skins[i].max_odds) {
        wonSkin = skins[i];
      }
    }
    if (skins === weightedSkins) console.log({num: random, min: wonSkin.min_odds, max: wonSkin.max_odds})
    return wonSkin;
  }

  let weightedWeaponSkins: any = [];
  for (let i = 0; i < weightedSkins.length; i++) {
    if (weightedSkins[i].rarity_name !== 'Extraordinary') {
      weightedWeaponSkins.push(weightedSkins[i])
    }
  }
  const maxWeaponOdds = weightedWeaponSkins[weightedWeaponSkins.length - 1].max_odds;
  function getImages(wonSkin: any) {
    let images = [];
    for (let i = 0; i < 60; i++) {
      if (i !== 50) {
        const skin = getWonSkin(weightedWeaponSkins, maxWeaponOdds);
        images.push(skin);
        continue;
      }
      images.push(wonSkin);
    }
    return images;
  }


  return ( 
    <div>
      {!muted && <Volume2 onClick={changeMute} className='absolute right-0 top-0 m-4 hover:cursor-pointer'/>}
      {muted && <VolumeOff onClick={changeMute} className='absolute right-0 top-0 m-4 hover:cursor-pointer'/>}
      <div className='flex flex-col items-center justify-center p-6'>
        <div className={'w-[1000px] overflow-hidden border-2 border-gray-300 rounded-lg mb-4 items-center justify-center transition h-[154px]'}>
          <Separator className={cn('absolute bg-orange-200 origin-center left-[50%] z-50 h-[152px]',  (!rollState.rolling && !rollState.rolled) && 'hidden')} orientation='vertical'/>
          <motion.div 
            className='flex'
            animate={{
              x: rollState.rolling ? ['0%', `-${land}%`] : rollState.rolled ? `-${land}%` : '0%',
            }}
            transition={{
              duration: 6,
              ease: 'circOut'

            }}
          >
            {
              imagesArr?.map((skin: any, index: any) => (
                <SkinImage skin={skin} index={index}/>
              ))
            }
          </motion.div>
        </div>
        <span>{selectedItem?.name}</span>
        <button
          className={`px-6 py-2 text-lg font-semibold rounded-md ${rollState.rolling ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
          onClick={startRoll}
          disabled={rollState.rolling}
        >
          {rollState.rolling ? 'Rolling...' : 'Open Case'}
        </button>
        <audio ref={audioRef} src={audio} />
      </div>
    </div>
   );
}
 
export default CrateOpening;