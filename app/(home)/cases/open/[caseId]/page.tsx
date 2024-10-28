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
        <div className="relative min-h-[80vh] w-[95%] flex items-center justify-center bg-slate-800 mx-auto self-center">
          <div className="flex flex-col items-center w-full max-w-screen-lg pb-10">
            <div className='absolute top-5'>
              <div className='flex flex-col items-center'>
                <span>Cost: ${crate.value.toFixed(2)}</span>
                <Image src={crate.image} alt="Crate" height={200} width={200} className='drop-shadow-lg'/>
                <span>{crate.name}</span>
              </div>
            </div>
            <div className="w-full justify-end mt-auto">
              <CrateOpening skins={crate.skins} crateValue={crate.value} />
            </div>
          </div>
        </div>


    );
}
 
export default OpenCasePage;