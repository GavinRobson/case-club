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

  const profit = net_earnings > 0;
  return ( 
    <div>
      <div className="hidden md:block ">
        <span className={`w-full items-center flex justify-center pb-4 ${profit ? 'text-green-500': 'text-red-500'}`}>Net Earnings: {!profit && "-"}${net_earnings.toFixed(2)}</span>
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