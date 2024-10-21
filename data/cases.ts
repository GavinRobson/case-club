import { db } from '@/lib/db';

export const getAllCases = async () => {
  const cases = await db.case.findMany();

  return cases
}