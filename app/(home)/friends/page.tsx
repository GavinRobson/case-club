import { auth } from "@/auth";
import Friend from "@/components/friends/friend";
import RedirectToSignIn from "@/components/navigation/redirect-to-sign-in";
import { getFriendsOfUser } from "@/data/user";


const FriendsPage = async () => {
  const session = await auth();
  if (!session) {
    return <RedirectToSignIn page='friends'/>
  }
  const user = session.user;
  const friendsData = await getFriendsOfUser(user?.id);
  if (!friendsData) {
    return (
      <div className="w-screen items-center flex justify-center">
        No Friends
      </div>
    )
  }
  return ( 
    <div className="w-full flex items-center justify-center">
      <div className="flex flex-col w-full justify-center items-center gap-2">
        {friendsData.friends.map((friend, i) => (
          <Friend key={i} friend={friend}/>
        ))}
      </div>
    </div>
   );
}
 
export default FriendsPage;