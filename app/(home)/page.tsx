import Information from "@/components/home/information";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  return (
    <div className="flex flex-col w-screen h-auto items-center justify-start pt-4 pb-6">
      <h1 className="md:text-4xl text-3xl">Welcome to Case Club</h1>
      <div className="md:w-1/2 w-3/4 grid grid-flow-row md:grid-cols-2 sm:grid-cols-1  gap-6 pt-4 h-auto">
        <Information 
          header="How it works"
          content="Browse all cases in the 'Cases' tab, select one that interests you, and get to opening! View your open history in the 'History' tab. View your entire inventory in the 'Inventory' tab."
        />
        {session === null && (
          <Information 
            header="Sign in for a better experience!"
            content="By creating an account, you will be able to view your opening history, inventory, add friends, and more!"
          />
        )}
        <Information 
          header="The name of the game"
          content="The name of the game is all about earning more than you spend. Track your spent and earned money by hovering the account icon in the top right corner of the screen."
        />
        <Information 
          header="Why a fake gambling site?"
          content="My friends and I were extremely involved in the Counter-Strike skins market and in order to prevent them from spending more money than they already have, I created this website for them to gamble for free! Of course, there are no Big Wins on this site, but the thrill is still there."
        />
        <Information 
          header="Is this site true to the game?"
          content="Yes! This site uses the odds from the official game that were released with the Perfect World update. For example, a knife is just as rare on this site as it is in Counter-Strike."
        />
        <Information 
          header="Try our AI chat bot!"
          content="If you ever have any questions about cases, skins, rare patterns, or more, consider asking our chat bot located in the bottom right corner of the screen. Our chatbot is powered by OpenAI and is automatically programmed to give you the best data about the Counter-Strike market."
        />
        <Information 
          header="About the developer"
          content="Hey! My name is Gavin Robson, and I'm currently a Junior at Towson University studying computer science. I stumbled upon NextJs/React in the summer of 2023, and I have been coming up with projects like this to create in my free time to expand my knowledge about web development."
        />
      </div>
    </div>
  );
}
