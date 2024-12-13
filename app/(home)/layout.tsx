import Footer from "@/components/navigation/footer";
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
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">{children}</main>
      </div>
      <Footer />
    </>
  )
}