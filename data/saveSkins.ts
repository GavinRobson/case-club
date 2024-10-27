import { auth } from '@/auth';
import axios from 'axios';

export default async function saveSkins(
  skin: any, 
  wear: string, 
  float: number, 
  pattern_id: number, 
  stattrak: boolean, 
  market_hash_name: string, 
  crateValue: number
) {

  let image = ""
  if (wear === 'Factory New' || wear === 'Minimal Wear') {
      image = skin?.images[0]
    }
    if (wear === 'Field-Tested') {
      image = skin?.images[1]
    }
    if (wear === 'Well-Worn' || wear ==='Battle-Scarred') {
      image = skin?.images[2]
    }

    try {
      
      const data = await axios.get(`/api/getSkinValue/?skin=${encodeURI(market_hash_name)}`);

      const response = await axios.post('/api/saveSkin', {
        name: skin.name,
        wear,
        value: data.data.value,
        volume: data.data.volume,
        float,
        pattern_id,
        stattrak,
        market_hash_name,
        image,
        skin_id: skin.id,
        crateValue
      });

      console.log('Skin saved successfully:', response.data);
    } catch (error: any) {
      console.error('Error saving skin:', error.response.data);
    }
}
