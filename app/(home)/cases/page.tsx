
import { Suspense } from "react";
import CrateButton from "@/components/crates/crate-button";
import CrateButttonSkeleton from "@/components/crates/crate-button-skeleton";
import { getAllCases } from "@/data/cases";

const CasesPage = async () => {
  const cases = await getAllCases();

  return (
    <div>
      <div className="w-screen h-full hidden md:flex justify-center mx-auto">
        <div className="grid grid-flow-row grid-cols-4 gap-2">
          <Suspense fallback={
            Array.from({ length: 12 }).map((_, index) => (
              <CrateButttonSkeleton key={index}/>
            ))
          }>
            {cases.map(crate => (
              <CrateButton crate={crate} key={crate.id} />)
            )}
          </Suspense>
        </div>
      </div>
      <div className="w-full h-full flex md:hidden justify-center mx-auto">
        <div className="flex flex-col space-y-2">
            <Suspense fallback={
              Array.from({ length: 2 }).map((_, index) => (
                <CrateButttonSkeleton key={index}/>
              ))
            }>
              {cases.map(crate => ( 
                <CrateButton crate={crate} key={crate.id} />
              ))}
            </Suspense>
        </div>
      </div>
    </div>
  );
};

export default CasesPage;