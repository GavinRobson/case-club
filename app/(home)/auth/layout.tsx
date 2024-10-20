import { auth } from '@/auth';
import { redirect } from 'next/navigation';

type Props = {
  children: React.ReactNode;
}

const AuthLayout = async ({ children }: Props) => {
  const session = await auth();
  if (session) {
    redirect('/settings')
  }

  return <div>{children}</div>
}
 
export default AuthLayout;