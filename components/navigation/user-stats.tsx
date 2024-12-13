'use client';

import useSWR from 'swr';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export const UserStats = ({ userId }: {userId: string | undefined | null}) => {
  
  if (userId === undefined || userId === null) {
    return null;
  }

  const { data, error } = useSWR(`/api/user-stats?id=${userId}`, fetcher, {
    refreshInterval: 5000
  });

  if (error) return <div>Error loading data.</div>;
  if (!data) return <div>Loading...</div>

  return (
    <>
      <div className="text-white/50 py-1 px-4 hover:text-white hover:bg-white/30 transition rounded-[0.25rem]">
        <span>Total Spent: ${data?.spent?.toFixed(2)}</span>
      </div>
      <div className="text-white/50 py-1 px-4 hover:text-white hover:bg-white/30 transition rounded-[0.25rem]">
        <span>Total Earned: ${data?.earned?.toFixed(2)}</span>
      </div>
    </>
  );
}