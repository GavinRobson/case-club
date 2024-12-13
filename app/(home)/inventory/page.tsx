import { Suspense } from "react";
import ItemButton from '@/components/inventory/item-button'
import ItemButtonSkeleton from '@/components/inventory/item-button-skeleton'
import { getAllItems } from '@/data/user';
import { auth } from "@/auth";
import NoItemRedirect from "@/components/inventory/no-item-redirect";
import ResetInventoryButton from "@/components/inventory/reset-inventory-button";
import RedirectToSignIn from "@/components/navigation/redirect-to-sign-in";

const InventoryPage = async () => {
  const session = await auth();

  if (!session) {
    return (
      <RedirectToSignIn page='inventory' />
    )
  }

  const user = await getAllItems(session.user?.id);
  if (!user) {
    return (
      <div>
        No Items
      </div>
    )
  }

  const items = user.inventory?.inventorySkin;

  if (items === undefined || items.length === 0) {
    return (
      <NoItemRedirect />
    )
  }

  let net_earnings = 0;

  if (user?.spent === null && user.earned === null) {
    null;
  } else {
    net_earnings = user.earned! - user.spent!;
  }

  const earnings = Math.abs(net_earnings);
  const profit = net_earnings > 0;
  return ( 
    <div>
      <div className="hidden md:block">
        <div className="flex flex-col w-full items-center justify-center">
        <h1 className="text-3xl">Inventory</h1>
        <div className="flex flex-row space-x-4 pt-4 items-center">
        <span>Spent: ${user.spent?.toFixed(2)}</span>
        <span>Earned: ${user.earned?.toFixed(2)}</span>
        <span className={`${profit ? 'text-green-500': 'text-red-500'}`}>Net Earnings: {!profit && "-"}${earnings.toFixed(2)}</span>
        </div>
        <div className="py-6">
          <ResetInventoryButton />
        </div>
        </div>
        <div className="w-screen h-full flex justify-center items-center mx-auto px-4">
          <div className="grid grid-flow-row grid-cols-6 gap-2 max-w-screen-xl justify-items-center">
            <Suspense fallback={
              Array.from({ length: 12 }).map((_, index) => (
                <ItemButtonSkeleton key={index}/>
              ))
            }>
              {items.map(item => (
                <ItemButton item={item} key={item.id}/>
              ))}
            </Suspense>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex flex-col md:hidden justify-center items-center mx-auto space-y-4">
          <h1 className="text-xl">Inventory</h1>
          <div className="flex flex-row space-x-2">
            <span>Earned: ${user.earned?.toFixed(2)}</span>
            <span>Spent: ${user.spent?.toFixed(2)}</span>
          </div>
          <span className={`${profit ? 'text-green-500': 'text-red-500'}`}>Net Earnings: {!profit && "-"}${earnings.toFixed(2)}</span>
          <ResetInventoryButton />
        <div className="flex flex-col space-y-2">
            <Suspense fallback={
              Array.from({ length: 2 }).map((_, index) => (
                <ItemButtonSkeleton key={index}/>
              ))
            }>
              {items.map(item => ( 
                <ItemButton item={item} key={item.id} />
              ))}
            </Suspense>
        </div>
      </div>
    </div>
   );
}
 
export default InventoryPage;