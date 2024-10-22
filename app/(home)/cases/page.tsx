
import { Suspense } from "react";
import CrateButton from "@/components/crates/crate-button";
import CrateButttonSkeleton from "@/components/crates/crate-button-skeleton";
import { getAllCases } from "@/data/cases";

const CasesPage = async () => {
  const casePromise = getAllCases();

  return (
    <div className="w-screen h-full px-96">
      <div className="grid grid-flow-row grid-cols-4 gap-2">
        <Suspense fallback={
          Array.from({ length: 12 }).map((_, index) => (
            <CrateButttonSkeleton key={index}/>
          ))
        }>
          {casePromise.then(cases =>
            cases.map(crate => <CrateButton crate={crate} key={crate.id} />)
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default CasesPage;