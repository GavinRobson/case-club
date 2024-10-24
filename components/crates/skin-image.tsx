import Image from 'next/image';

type Props = {
  skin: any
  index: number
}

const SkinImage = ({ skin, index }: Props) => {
  const color = skin?.rarity_color;
  return ( 
    <div 
      className='flex flex-row shrink-0 text-center items-center justify-center border border-gray-300 h-[156px]'
      style={{ background: `linear-gradient(to top, ${color}, #44474d 40%)` }}
    >
      <Image src={skin?.images[0]} alt={'Skin'} width={200} height={200}/>
    </div>
   );
}
 
export default SkinImage;