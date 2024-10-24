import { populateMarketHashName } from "@/scripts/populateMarketHashName";
import { populateSkins } from "@/scripts/populateSkins";
import { redirect } from "next/navigation";

const PopulatePage = async () => {
  await populateMarketHashName();
  redirect('/');
  return ( 
    <div>
      Populate Page
    </div>
   );
}
 
export default PopulatePage;