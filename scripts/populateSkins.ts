import { db } from '@/lib/db';

export const populateSkins = async () => {
  const response1 = await fetch('https://bymykel.github.io/CSGO-API/api/en/skins.json');
  const skins = await response1.json();

  for (var i = 0; i < skins.length; i++) {
    var baseUrl = skins[i].image.substring(0, skins[i].image.indexOf('_light_png.png'));
    const mediumUrl = baseUrl + "_medium_png.png";
    const heavyUrl = baseUrl + "_heavy_png.png";
    var images = [skins[i].image];

    let wears = []
    if (i < 1808) {

      const wearData = skins[i].wears;
      
      for (var j = 0; j < skins[i].wears.length; j++) {
        wears.push(wearData[j].name.toString());
      }
    } else {
      wears = ["Factory New"];
    }

    images.push(mediumUrl, heavyUrl);
    let rarity_color = "";
    let rarity = "";
    if (skins[i].category.name === 'Knife') {
      rarity_color = "#eb4b4b"
      rarity = "Extraordinary"
    } else {
      rarity = skins[i].rarity.name;
      rarity_color = skins[i].rarity.color
    }

    await db.skin.create({
      data: {
        skin_id: skins[i].id,
        name: skins[i].name,
        description: skins[i].description,
        weapon: skins[i].weapon.id,
        category: skins[i].category.name,
        pattern: skins[i].pattern?.name.toString(), 
        min_float: skins[i].min_float,
        max_float: skins[i].max_float,
        rarity_id: skins[i].rarity.id,
        rarity_name: rarity,
        rarity_color: rarity_color,
        stattrak: skins[i].stattrak,
        souvenir: skins[i]?.souvenir,
        paint_index: skins[i].paint_index,
        wears,
        team: skins[i].team.name,
        images,
      }
    });
  }

  console.log('Done')
}