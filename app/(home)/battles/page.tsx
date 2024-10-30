// app/battle/page.tsx (or wherever your BattlePage is located)
import { auth } from '@/auth';
import Chat from '@/components/battles/chat';

const BattlePage = async () => {
  const session = await auth();

  if (!session) {
    return (
      <div>
        You must be logged in to battle
      </div>
    )
  }

    return (
        <div className="flex">
            <div className="flex-grow p-4">
                <h2 className="text-xl font-semibold mb-4">Battle Lobby</h2>
                {/* Add other battle-related UI elements here */}
                <p>Welcome to the battle lobby! Prepare for action!</p>
            </div>
            <Chat username={session?.user?.name}/> {/* Add the Chat component to the right side */}
        </div>
    );
};

export default BattlePage;
