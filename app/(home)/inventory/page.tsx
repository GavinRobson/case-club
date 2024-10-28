import { Suspense } from "react";
import ItemButton from '@/components/inventory/item-button'
import ItemButtonSkeleton from '@/components/inventory/item-button-skeleton'
import { getAllItems } from '@/data/user';
import { auth } from "@/auth";
import NoItemRedirect from "@/components/inventory/no-item-redirect";

const InventoryPage = async () => {
  const session = await auth();

  if (!session) {
    return (
      <div>
        Sign In
      </div>
    )
  }

  const user = await getAllItems(session.user?.id);
  console.log(user)
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
      <div className="hidden md:block ">
        <div className="flex flex-col w-full items-center justify-center">

        <div className="flex flex-row space-x-2">
        <span>Spent: ${user.spent?.toFixed(2)}</span>
        <span>Earned: ${user.earned?.toFixed(2)}</span>
        </div>
        <span className={`${profit ? 'text-green-500': 'text-red-500'}`}>Net Earnings: {!profit && "-"}${earnings.toFixed(2)}</span>
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
      <div className="w-full h-full flex md:hidden justify-center mx-auto">
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