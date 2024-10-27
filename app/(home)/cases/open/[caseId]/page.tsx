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

    return ( 
        <div className='absolute inset-10 flex items-center justify-center bg-slate-800 mt-24'>
          <div className='flex flex-col items-center h-full pt-10'>
            <div className='flex flex-row space-x-2'>
              <span>Cost: ${crate.value.toFixed(2)}</span>
            </div>
            <Image src={crate.image} alt="Crate" height={200} width={200}/>
            <span>{crate.name}</span>
            <div className='h-full flex justify-end'>
              <CrateOpening skins={crate.skins} crateValue={crate.value}/>
            </div>
          </div>
        </div>
    );
}
 
export default OpenCasePage;