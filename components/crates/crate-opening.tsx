'use client';

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SkinImage from '@/components/crates/skin-image';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import weighSkins from '@/functions/weigh-skins';
import { useRef } from 'react'
import { Loader2, Volume2, VolumeOff } from 'lucide-react';
import WearBar from '@/components/crates/wear-bar';
import saveSkins from '@/data/saveSkins';
import { Button } from '../ui/button';
import CrateItemButton from './crate-item-button';

const CrateOpening = ({ skins, crateValue, caseId }: { skins: any, crateValue: number, caseId: string }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [muted, setMuted] = useState(false);
  const [rollState, setRollState] = useState({rolling: false, rolled: false});
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [imagesArr, setImagesArr] = useState<any>(null);
  const [land, setLand] = useState(0);
  const [audio, setAudio] = useState('/sfx/mil_spec.mp3');
  const [goAudio, setGoAudio] = useState(false);
  const [skinInfo, setSkinInfo] = useState({ float: 0, wear: "", stattrak: false, pattern_id: 0, value: 0, volume: 0, hash_name: "", id: "" })
  const [value, setValue] = useState("");
  const [gettingValue, setGettingValue] = useState(false);
  const [show, setShow] = useState(false);
  const [openedSkins, setOpenedSkins] = useState<any[]>([])
  const [save, setSave] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);

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
    setFirstLoad(false);
    setRollState({ rolling: false, rolled: false })
    setSelectedItem(null);
    setValue("");
    setShow(false);

    const wonSkin = getWonSkin(weightedSkins, 100000);

    const landNum = 965 + Math.floor(Math.random() * 19);
    setLand(landNum)
    
    const images = getImages(wonSkin);
    setImagesArr(images);

    setSelectedItem(wonSkin)
    
    setRollState({rolling: true, rolled: false});

    if (wonSkin.rarity_name === 'Covert' || wonSkin.rarity_name === 'Extraordinary' || wonSkin.rarity_name === 'Classified') {
      setGoAudio(!goAudio);
      setAudio('/sfx/knife_win.mp3')
    } else {
      setGoAudio(!goAudio);
      setAudio('/sfx/mil_spec_win.mp3')
    }

    setTimeout( async () => {
      setRollState({rolling: false, rolled: true}) 
      setShow(true);
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
    return wonSkin;
  }

  let weightedWeaponSkins: any = [];
  for (let i = 0; i < weightedSkins.length; i++) {
    if (weightedSkins[i].rarity_name !== 'Extraordinary') {
      weightedWeaponSkins.push(weightedSkins[i])
    }
  }

  useEffect(() => {
    if (openedSkins[0]?.skin && save) {
      saveSkins(openedSkins[0].skin, openedSkins[0].wear, openedSkins[0].float, openedSkins[0].pattern_id, openedSkins[0].stattrak, openedSkins[0].market_hash_name, crateValue, caseId)
    }
  }, [openedSkins])

  const getSkinValue = async () => {
    setGettingValue(true);
    if (selectedItem === null) {
      setGettingValue(false);
      return;
    };

    try {
      const response = await fetch(`/api/getSkinValue?skin=${skinInfo.hash_name}`)
      const data = await response.json();
      if (response.ok) {
        setValue(data.value)
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Failed to fetch skin value:', error)
    } finally {
      setGettingValue(false);
    }
  }

  useEffect(() => {
    getSkinValue();
  }, [skinInfo])

  useEffect(() => {
    if (selectedItem) {
      const float = (Math.random() * (selectedItem.max_float - selectedItem.min_float) + selectedItem.min_float).toFixed(14);
      const pattern_id= Math.floor(Math.random() * 1000);
      const stattrak = selectedItem.stattrak ? 9 === Math.floor(Math.random() * 10) : false
      let wear = "";
      if (float >= 0.0 && float < 0.07) {
        wear = "Factory New"
      } else if (float >= 0.07 && float < 0.15) {
        wear = "Minimal Wear"
      } else if (float >= 0.15 && float < 0.38) {
        wear = "Field-Tested"
      } else if (float >= 0.38 && float < 0.45) {
        wear = "Well-Worn"
      } else if (float >= 0.45 && float <= 1.00) {
        wear = "Battle-Scarred"
      } else {
        wear = ""
      }
      const hash_name = stattrak ? `StatTrak\u2122 ${selectedItem.name} (${wear})` : `${selectedItem.name} (${wear})`;
      setSkinInfo({ float, wear, stattrak, pattern_id, value: 0, volume: 0, hash_name, id: selectedItem.skin_id })
      setOpenedSkins([{ skin: selectedItem, wear, float, pattern_id, stattrak, market_hash_name: hash_name }])
    } 
  }, [selectedItem])

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

  const changeSave = () => {
    setSave(!save)
  }



  if (firstLoad) {
    return (
      <div>
        <div className='hidden md:block'>
          <div className='flex w-full items-center justify-center'>
            {!muted && <Volume2 onClick={changeMute} className='absolute right-0 top-0 m-4 hover:cursor-pointer'/>}
            {muted && <VolumeOff onClick={changeMute} className='absolute right-0 top-0 m-4 hover:cursor-pointer'/>}
            <div className='absolute left-0 top-0 m-4'>
              <div className='flex items-center'>
                <span className=''>Currently:</span>
                {save && <Button variant='green' onClick={changeSave} className='ml-2'>Saving to Inventory</Button>}
                {!save && <Button variant='destructive' onClick={changeSave} className='ml-2'>Not Saving</Button>}
              </div>
            </div>
            <div className='h-full flex flex-col pt-56 items-center'>
              <button
                className={`flex self-center px-6 py-2 text-lg font-semibold rounded-md justify-center ${rollState.rolling ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                onClick={startRoll}
                disabled={rollState.rolling}
                >
                {rollState.rolling ? 'Rolling...' : 'Open Case'}
              </button>
              <div className='flex justify-center w-full items-center mt-4'>
                <div className="grid grid-flow-row w-full gap-2 max-w-screen-xl grid-cols-5">
                  {weaponSkins.map((skin: any, index: any) => (
                    <CrateItemButton item={{...skin, steam: true}} key={index}/>
                  ))}
                <CrateItemButton 
                  item={
                    {
                      name: 'Rare Special Item',
                      images: ['/rare_special_item.png'],
                      steam: false
                    }
                  } 
                />
                </div>  
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full flex flex-col md:hidden items-center justify-center pt-56">
          <button
            className={`flex self-center px-6 py-2 text-lg font-semibold rounded-md justify-center ${rollState.rolling ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
            onClick={startRoll}
            disabled={rollState.rolling}
            >
            {rollState.rolling ? 'Rolling...' : 'Open Case'}
          </button>
        <div className="flex flex-col space-y-2 pt-4">
              {weaponSkins.map((skin: any, index: any) => {
                return (
                  <CrateItemButton item={{...skin, steam: true}} key={index} />
                )
              })}
              <CrateItemButton 
                item={
                  {
                    name: 'Rare Special Item',
                    images: ['/rare_special_item.png'],
                    steam: false
                  }
                } 
              />
        </div>
      </div>
      </div>
    )
  }

  if (!firstLoad) {
    return ( 
      <div>
        {!muted && <Volume2 onClick={changeMute} className='absolute right-0 top-0 m-4 hover:cursor-pointer'/>}
        {muted && <VolumeOff onClick={changeMute} className='absolute right-0 top-0 m-4 hover:cursor-pointer'/>}
        <div className='absolute left-0 top-0 m-4'>
          <div className='flex items-center'>
            <span className=''>Currently:</span>
            {save && <Button variant='green' onClick={changeSave} className='ml-2'>Saving to Inventory</Button>}
            {!save && <Button variant='destructive' onClick={changeSave} className='ml-2'>Not Saving</Button>}
          </div>
        </div>
        <div className='w-full flex flex-col items-center justify-center p-6 pt-56'>
            <div className={'w-[1000px] overflow-hidden border-2 border-gray-300 rounded-lg mb-4 items-center justify-center transition h-[154px]'}>
              <Separator className={cn('absolute bg-orange-200 origin-center left-[50%] z-40 h-[152px]',  (!rollState.rolling && !rollState.rolled) && 'hidden')} orientation='vertical'/>
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
                    <SkinImage skin={skin} index={index} wear={skinInfo.wear}/>
                  ))
                }
              </motion.div>
            </div>
          {(selectedItem && show) && (
            <div>
            <span className='text-orange-400'>{skinInfo.stattrak ? "StatTrak™ " : ""}</span>
            <span>{selectedItem?.name} ({skinInfo.wear})</span>
            </div>
          )}
          {(selectedItem && show) && <span className='pt-1'>Float: {skinInfo.float}</span>}
          {(selectedItem && show) && <WearBar float={skinInfo.float}/>}
          {(selectedItem && show) && <span className='pt-1'>Pattern ID: {skinInfo.pattern_id}</span>}
          {(gettingValue && show) && <Loader2 className='animate-spin'/>}
          {(value && show) && <span>Value: ${value}</span>}
          <button
            className={`px-6 py-2 text-lg font-semibold rounded-md ${rollState.rolling ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
            onClick={startRoll}
            disabled={rollState.rolling}
          >
            {rollState.rolling ? 'Rolling...' : 'Open Case'}
          </button>
          <audio ref={audioRef} src={audio} preload='auto'/>
        </div>
      </div>
    );
  }
}
 
export default CrateOpening;