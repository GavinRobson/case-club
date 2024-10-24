export default function weighSkins(skins: any[]) {
  const totalOdds = 100000;
  let mil_spec_odds = 79920;
  let restricted_odds = 15980;
  let classified_odds = 3200;
  let covert_odds = 640;
  let extraordinary_odds = 260;

  let num_mil_spec = 0;
  let num_restricted = 0;
  let num_classified = 0;
  let num_covert = 0;
  let num_extraordinary = 0;

  // Count the number of skins in each rarity
  for (let i = 0; i < skins.length; i++) {
    switch (skins[i].rarity_name) {
      case "Mil-Spec Grade":
        num_mil_spec++;
        break;
      case "Restricted":
        num_restricted++;
        break;
      case "Classified":
        num_classified++;
        break;
      case "Covert":
        num_covert++;
        break;
      case "Extraordinary":
        num_extraordinary++;
        break;
    }
  }

  // Calculate the odds per skin
  const mil_spec_per_skin = mil_spec_odds / (num_mil_spec || 1);
  const restricted_per_skin = restricted_odds / (num_restricted || 1);
  const classified_per_skin = classified_odds / (num_classified || 1);
  const covert_per_skin = covert_odds / (num_covert || 1);
  const extraordinary_per_skin = extraordinary_odds / (num_extraordinary || 1);

  // Calculate the total calculated odds
  const calculated_total =
    (num_mil_spec * mil_spec_per_skin) +
    (num_restricted * restricted_per_skin) +
    (num_classified * classified_per_skin) +
    (num_covert * covert_per_skin) +
    (num_extraordinary * extraordinary_per_skin);

  // Calculate the adjustment factor to reach totalOdds
  const adjustmentFactor = totalOdds / calculated_total;

  // Apply adjustment factor to each rarity's odds per skin
  mil_spec_odds = Math.round(mil_spec_per_skin * adjustmentFactor);
  restricted_odds = Math.round(restricted_per_skin * adjustmentFactor);
  classified_odds = Math.round(classified_per_skin * adjustmentFactor);
  covert_odds = Math.round(covert_per_skin * adjustmentFactor);
  extraordinary_odds = Math.round(extraordinary_per_skin * adjustmentFactor);

  const categoryOrder: any = {
    'Mil-Spec Grade': 1,
    'Restricted': 2,
    'Classified': 3,
    'Covert': 4,
    'Extraordinary': 5,
  };

  const sortedSkins = skins.sort((a: any, b: any) => {
    return categoryOrder[a.rarity_name] - categoryOrder[b.rarity_name];
  });

  let current = 1;
  for (let i = 0; i < skins.length; i++) {
    if (sortedSkins[i].rarity_name === 'Mil-Spec Grade') {
      sortedSkins[i] = { ...sortedSkins[i], min_odds: current, max_odds: current + mil_spec_odds - 1 };
      current += mil_spec_odds;
    }
    if (sortedSkins[i].rarity_name === 'Restricted') {
      sortedSkins[i] = { ...sortedSkins[i], min_odds: current, max_odds: current + restricted_odds - 1 };
      current += restricted_odds;
    }
    if (sortedSkins[i].rarity_name === 'Classified') {
      sortedSkins[i] = { ...sortedSkins[i], min_odds: current, max_odds: current + classified_odds - 1 };
      current += classified_odds;
    }
    if (sortedSkins[i].rarity_name === 'Covert') {
      sortedSkins[i] = { ...sortedSkins[i], min_odds: current, max_odds: current + covert_odds - 1 };
      current += covert_odds;
    }
    if (sortedSkins[i].rarity_name === 'Extraordinary') {
      sortedSkins[i] = { ...sortedSkins[i], min_odds: current, max_odds: current + extraordinary_odds - 1 };
      current += extraordinary_odds;
    }
  }
  return sortedSkins;
}
