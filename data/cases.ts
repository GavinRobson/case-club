import { db } from '@/lib/db';

export const getAllCases = async () => {
  const cases = await db.case.findMany({
    orderBy: {
      first_sale_date: 'asc'
    }
  });

  return cases
}