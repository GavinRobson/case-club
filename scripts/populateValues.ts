import { db }from '@/lib/db'

export const populateCaseValues = async () => {
  const cases = await db.case.findMany();

  for (let i = 20; i < cases.length; i++) {
    let retries = 3;
    let success = false;

    while (retries > 0 && !success) {
      try {
        const caseName = cases[i].name.replace("&", "%26");
        const response = await fetch(`https://steamcommunity.com/market/priceoverview/?currency=1&appid=730&market_hash_name=${caseName}`);
        const data = await response.json();
        const price = data.median_price.replace("$", "");
        const crate = await db.case.update({
          where: {
            id: cases[i].id
          },
          data: {
            value: parseFloat(price)
          }
        })

        success = true;
      } catch (error) {
        console.error(error)
        retries--;
      }

      if (!success) {
        console.error(`Failed after retries for item ${i}`)
      }
    }
  }
}