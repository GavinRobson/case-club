import { db } from '@/lib/db';

import { Suspense } from 'react';
import Image from 'next/image';
import OpenCaseSkeleton from '@/components/crates/open-case-skeleton';
import CrateOpening from '@/components/crates/crate-opening';

const OpenCasePage = async ({ params }: { params: { caseId: string } }) => {
  const crateName = decodeURI(params.caseId).replaceAll("%3A", ":");
  
  const cratePromise = db.case.findFirst({
    where: { 
      name: crateName,
    },
    include: {
      skins: true,
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
            <Image src={crate.image} alt="Crate" height={200} width={200}/>
            <span>{crate.name}</span>
            <div className='h-full flex justify-end'>
              <CrateOpening />
            </div>
          </div>
        </div>
    );
}
 
export default OpenCasePage;