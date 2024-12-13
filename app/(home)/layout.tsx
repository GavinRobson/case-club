import Header from "@/components/navigation/header";
import MobileHeader from "@/components/navigation/mobile-header";
import Chat from "@/components/ui/chat";

type Props = {
  children: React.ReactNode;
}

export default function HomePageLayout({ children }: Props) {
  return (
    <>
      <Header />
      <MobileHeader />
      <Chat />
      <main>{children}</main>
    </>
  )
}