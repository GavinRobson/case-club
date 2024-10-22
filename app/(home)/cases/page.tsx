import CrateButton from "@/components/crate-button";
import { NavButton } from "@/components/navigation/nav-button";
import { Button } from "@/components/ui/button";
import { getAllCases } from "@/data/cases";

const CasesPage = async () => {
  const cases = await getAllCases();

  return (
    <div className="w-screen h-full px-96">
      <div className="grid grid-flow-row grid-cols-4 gap-2">
      {cases.map((crate) => (
          <CrateButton crate={crate}/>
      ))}
      </div>
    </div>
  );
};

export default CasesPage;