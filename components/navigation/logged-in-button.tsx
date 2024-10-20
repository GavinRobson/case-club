import { CircleUser } from 'lucide-react';

import { signOut } from '@/auth';
import { SettingsNav } from '@/components/navigation/settings-nav';

type Props = {
  username: string | undefined | null;
};

export const LoggedInButton = ({ username }: Props) => {
  return (
    <div className="relative group">
      <div className="text-gray-600 group-hover:text-gray-400 transition cursor-pointer peer z-20">
        <CircleUser />
      </div>
      <div className="bg-[#262830] hidden min-w-[162px] peer-hover:flex group-hover:flex absolute right-0 mt-2 shadow-lg rounded-[0.25rem]">
        <div className="absolute -top-[30px] -left-[30px] -right-[5px] -bottom-[30px] peer-hover:block group-hover:block z-10"></div>
        <div className="flex flex-col justify-center py-2 z-30 text-sm w-full">
          <form
            action={async () => {
              'use server';

              await signOut({ redirectTo: '/auth/login', redirect: true });
            }}
          >
            <div className="text-white px-4 cursor-default">{username}</div>
            <hr className="w-full my-2 border-t border-[#808080]" />
            <div className=" text-white/50 py-1 px-4 hover:text-white hover:bg-white/30 hover:outline hover:outline-1 cursor-pointer transition rounded-[0.25rem]">
              <button type="submit">Log Out</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
