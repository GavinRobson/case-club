import { db } from '@/lib/db';

export const populateMarketHashName = async () => {
    const skins = await db.skin.findMany();

    for (let i = 0; i < skins.length; i++) {
     const skin = skins[i];
     let market_hash_names = []

     for (let j = 0; j < skin.wears.length; j++) {
      market_hash_names.push(`${skin.name} (${skin.wears[j]})`)
     }
     await db.skin.update({
      where: {
        id: skin.id
      },
      data: {
        market_hash_names: {
          set: market_hash_names
        }
      }
     })
    }
  }