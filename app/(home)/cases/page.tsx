
import { Suspense } from "react";
import CrateButton from "@/components/crates/crate-button";
import CrateButttonSkeleton from "@/components/crates/crate-button-skeleton";
import { getAllCases } from "@/data/cases";

const CasesPage = async () => {
  const cases = await getAllCases();
  const casesWithPrices = await Promise.all(
    cases.map(async (crate) => {
      const hash_name = encodeURI(crate.market_hash_name).replace(":", "%3A");
      const response = await fetch(`https://www.steamwebapi.com/steam/api/item?key=WAERBNVBNRF04V5N&market_hash_name=${hash_name}&game=csgo`)
      const data = await response.json();

      return {
        ...crate, 
        price: response.ok ? data.realprice: null
      };
    })
  );

  return (
    <div className="w-screen h-full px-96">
      <div className="grid grid-flow-row grid-cols-4 gap-2">
        <Suspense fallback={
          Array.from({ length: 12 }).map((_, index) => (
            <CrateButttonSkeleton key={index}/>
          ))
        }>
          {casesWithPrices.map(crate => (
            <CrateButton crate={crate} key={crate.id} />)
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default CasesPage;