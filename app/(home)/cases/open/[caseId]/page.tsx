import { db } from '@/lib/db';

import { Suspense } from 'react';
import Image from 'next/image';
import OpenCaseSkeleton from '@/components/crates/open-case-skeleton';
import CrateOpening from '@/components/crates/crate-opening';

const OpenCasePage = async ({ params }: { params: { caseId: string } }) => {
  const cratePromise = db.case.findFirst({
    where: { 
      case_id: params.caseId,
    },
    include: {
      skins: {
        include: {
          cases: true
        }
      }
    }
  });

  return (
    <Suspense fallback={<OpenCaseSkeleton />}>
      <CrateContent cratePromise={cratePromise}/>
    </Suspense>
  )
}

  const CrateContent = async ({ cratePromise }: { cratePromise: Promise<any> }) => {
    const crate = await cratePromise;
    console.log(crate.market_hash_name)
    const response = await fetch(`https://steamcommunity.com/market/priceoverview/?currency=1&appid=730&market_hash_name=${encodeURI(crate.market_hash_name)}`)
    const data = await response.json();
    let cratePrice = 0;
    let crateVolume = 0;
    if (data) {
      cratePrice = data.median_price;
      crateVolume = data.volume;
    }

    return ( 
        <div className='absolute inset-10 flex items-center justify-center bg-slate-800 mt-24'>
          <div className='flex flex-col items-center h-full pt-10'>
            <div className='flex flex-row space-x-2'>
              {data && <span>Cost: {cratePrice}</span>}
              {data && <span>Supply: {crateVolume}</span>}
            </div>
            <Image src={crate.image} alt="Crate" height={200} width={200}/>
            <span>{crate.name}</span>
            <div className='h-full flex justify-end'>
              <CrateOpening skins={crate.skins}/>
            </div>
          </div>
        </div>
    );
}
 
export default OpenCasePage;