import { populateMarketHashName } from "@/scripts/populateMarketHashName";
import { populateSkins } from "@/scripts/populateSkins";
import { populateCaseValues } from "@/scripts/populateValues";
import { redirect } from "next/navigation";

const PopulatePage = async () => {
  await populateCaseValues();
  redirect('/');
  return ( 
    <div>
      Populate Page
    </div>
   );
}
 
export default PopulatePage;