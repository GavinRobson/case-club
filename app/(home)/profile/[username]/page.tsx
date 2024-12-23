import { auth } from "@/auth";
import AddFriendButton from "@/components/profile/add-friend-button";
import EditProfileButton from "@/components/profile/edit-profile-button";
import LogOutButton from "@/components/profile/log-out-button";
import UserImage from "@/components/profile/user-image";
import { checkFriends, getUserByUsername } from "@/data/user"
import { UserCheck } from "lucide-react";
import Image from "next/image";

export default async function ProfilePage({ params }: { params: { username: string } }) {
  const session = await auth();

  
  if (!params.username) {
    return (
      <div>
        Profile not found
      </div>
    )
  }

  const self = session?.user?.name === params.username;

  const user = await getUserByUsername(params.username);

  if (!user) {
    return (
      <div>
        Profile not found
      </div>
    )
  }

  const isFriended = await checkFriends(session?.user?.id, params.username);

  const net_earnings = user.earned! - user.spent!;
  const profit = net_earnings > 0;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center pt-4">
      <UserImage self={self} image={user.image}/>
      <div className="flex flex-row space-x-2 items-center justify-center pt-2">
        <span className="text-2xl font-bold">{user.name}</span>
        {(!self && !isFriended) && <AddFriendButton friendName={params.username}/>}
        {(!self && isFriended) && (
          <div className="flex h-10 w-10">
            <UserCheck className="p-2 h-full w-full"/>
          </div>
        )}
      </div>
      <span>Total Spent: ${user.spent?.toFixed(2)}</span>
      <span>Total Earned: ${user.earned?.toFixed(2)}</span>
      <span 
        className={`text-green-500 ${!profit && 'text-red-500'}`}
      >
        Net Earnings: {profit ? `$${net_earnings.toFixed(2)}` : `-$${Math.abs(net_earnings).toFixed(2)}`}
      </span>
      {self && <EditProfileButton username={params.username} />}
      {self && <LogOutButton />}
    </div>
  )
}