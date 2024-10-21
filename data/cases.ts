import { db } from '@/lib/db';

export const createCases = async () => {
  const response = await fetch(`https://bymykel.github.io/CSGO-API/api/en/crates.json`);
  const data = await response.json();

  const cases = await db.case.create({
    data: data,
  })

  return cases;
}

export const updateCases = async () => {
  const response = await fetch(`https://bymykel.github.io/CSGO-API/api/en/crates.json`);
  const data = await response.json();

  const cases = await db.case.update({
    where: {
      id: "1",
    },
    data: data
  });

  return cases;
}

export const getCases = async () => {
  const cases = await db.case.findUnique({
    where: {
      id: "1",
    }
  });

  return cases
}