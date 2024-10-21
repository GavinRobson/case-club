import { db } from '@/lib/db';

export const populateCases = async () => {
  const response = await fetch('https://bymykel.github.io/CSGO-API/api/en/crates.json');
  const data = await response.json();

  for (let i = 0; i < data.length; i++) {
    if (data[i].type !== 'Case' || data[i].type === null) {
      continue;
    }

    let skins = [];
    for (let j = 0; j < data[i].contains.length; j++) {
      const skin_id = data[i].contains[j].id;
      const skin = await db.skin.findUnique({ where: {skin_id} });
      skins.push(skin);
    }

    let extraordinaries = [];
    for (let j = 0; j < data[i].contains_rare.length; j++) {
      const rare_skin_id = data[i].contains_rare[j].id;
      const rare_skin = await db.skin.findUnique({ where: {skin_id: rare_skin_id} });
      extraordinaries.push(rare_skin);
    }

    await db.case.create({
      data: {
        name: data[i].name,
        description: data[i].description,
        type: data[i].type,
        first_sale_date: data[i].first_sale_date,
        skins: skins,
        market_hash_name: data[i].market_hash_name,
        

      }
    })
  }
}