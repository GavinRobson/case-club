import { populateSkins } from "@/scripts/populateSkins";
import { redirect } from "next/navigation";

const PopulatePage = async () => {
  await populateSkins();
  redirect('/');
  return ( 
    <div>
      Populate Page
    </div>
   );
}
 
export default PopulatePage;