import { useRouter } from "next/navigation";

type Props = {
  user: any;
}

const SearchUserButton = ({user}: Props) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`/profile/${user.name}`)
  }
  return ( 
    <div 
      className="w-full bg-slate-800 flex items-center justify-center min-h-20 rounded-lg hover:bg-slate-700 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-row justify-between w-full p-2">
        <span className="text-xl hover:underline">{user.name}</span>
        <span>Spent: ${user.spent.toFixed(2)}</span>
        <span>Earned: ${user.earned}</span>
      </div>
    </div>
   );
}
 
export default SearchUserButton;