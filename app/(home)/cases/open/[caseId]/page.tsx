import { db } from '@/lib/db';
import Image from 'next/image';

const OpenCasePage = async ({ params }: { params: { caseId: string } }) => {
  const crateName = decodeURI(params.caseId).replaceAll("%3A", ":");
  
  const crate = await db.case.findFirst({
    where: { 
      name: crateName,
    },
    include: {
      skins: true,
    }
  });

  if (!crate) {
    return (
      <div className='w-screen flex items-center justify-center'>
        <span className='font-bold text-3xl text-red-700 outline-8 outline-black'>Error 404: Case not found!</span>
      </div>
    )
  }

  return ( 
    <div className='absolute inset-10 flex items-center justify-center bg-slate-800 mt-24'>
      <div className='flex flex-col items-center h-full pt-10'>
        <Image src={crate.image} alt="Crate" height={200} width={200}/>
        <span>{crate.name}</span>
      </div>
    </div>
   );
}
 
export default OpenCasePage;