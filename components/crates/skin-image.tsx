import Image from 'next/image';

type Props = {
  skin: any
  index: number
  wear?: string
}

const SkinImage = ({ skin, index, wear }: Props) => {
  const color = skin?.rarity_color;
  let image = ""
  if (index === 50) {
    if (wear === 'Factory New' || wear === 'Minimal Wear') {
      image = skin?.images[0]
    }
    if (wear === 'Field-Tested') {
      image = skin?.images[1]
    }
    if (wear === 'Well-Worn' || wear ==='Battle-Scarred') {
      image = skin?.images[2]
    }
  } else {
    image = skin?.images[0]
  }
  return ( 
    <div 
      className='flex flex-row shrink-0 text-center items-center justify-center border border-gray-300 h-[156px]'
      style={{ background: `linear-gradient(to top, ${color}, #44474d 40%)` }}
    >
      <Image src={image} alt={'Skin'} width={200} height={200}/>
    </div>
   );
}
 
export default SkinImage;