import { db } from '@/lib/db';

export const populateCases = async () => {
  const response = await fetch('https://bymykel.github.io/CSGO-API/api/en/crates.json');
  const data = await response.json();

  for (let i = 0; i < data.length; i++) {
    if (data[i].type !== 'Case' || data[i].type === null) {
      continue;
    }

    await db.case.create({
      data: {
        name: data[i].name,
        case_id: data[i].id,
        description: data[i].description,
        type: data[i].type,
        first_sale_date: data[i].first_sale_date,
        market_hash_name: data[i].market_hash_name,
        rental: data[i].rental,
        image: data[i].image,
        model_player: data[i].model_player,
      }
    })
  }
}