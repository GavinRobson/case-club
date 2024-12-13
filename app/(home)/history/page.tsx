import { auth } from "@/auth";
import OpenedItem from "@/components/history/opened-item";
import NoItemRedirect from "@/components/inventory/no-item-redirect";
import RedirectToSignIn from "@/components/navigation/redirect-to-sign-in";
import { getAllItems } from "@/data/user";

const HistoryPage = async () => {
  const session = await auth();

  if (!session) {
    return (
      <RedirectToSignIn page='history'/>
    )
  }
  const openedSkins = await getAllItems(session?.user?.id);

  if (!openedSkins?.inventory?.inventorySkin) {
    return (
      <NoItemRedirect />
    )
  }

  return ( 
    <div className="mt-2 flex flex-col space-y-2 items-center justify-center w-screen">
      <h1 className="text-xl">History</h1>
      {openedSkins.inventory.inventorySkin.map((skin: any, index: any) => (
        <OpenedItem item={skin} key={index}/>
      ))}
    </div>
   );
}
 
export default HistoryPage;