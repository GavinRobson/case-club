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

  const itemsWithPrices = await Promise.all(
    items.map(async (item) => {
      if (!item.value) {
        const response = await fetch(`https://steamcommunity.com/market/priceoverview/?currency=1&appid=730&market_hash_name=${item.market_hash_name}`)
        const data = await response.json();

        return {
          ...item,
          value: response.ok ? data.median_price : null
        };
      } else {
        return {
          ...item
        }
      }
    })
  );

  console.log(user)

  return ( 
    <div>
      <div className="w-screen h-full hidden md:flex justify-center mx-auto">
        <div className="grid grid-flow-row grid-cols-4 gap-2">
          <Suspense fallback={
            Array.from({ length: 12 }).map((_, index) => (
              <ItemButtonSkeleton key={index}/>
            ))
          }>
            {itemsWithPrices.map(item => (
              <ItemButton item={item} key={item.id}/>
            ))}
          </Suspense>
        </div>
      </div>
    </div>
   );
}
 
export default InventoryPage;