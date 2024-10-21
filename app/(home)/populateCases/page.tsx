import { populateCases } from "@/scripts/populateCases";
import { redirect } from "next/navigation";

const PopulateCasesPage = async () => {
  await populateCases();
  redirect('/');
  return ( 
    <div>
      Populate Cases Page
    </div>
   );
}
 
export default PopulateCasesPage;