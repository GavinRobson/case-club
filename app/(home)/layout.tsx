import Header from "@/components/navigation/header";
import MobileHeader from "@/components/navigation/mobile-header";

type Props = {
  children: React.ReactNode;
}

export default function HomePageLayout({ children }: Props) {
  return (
    <>
      <Header />
      <MobileHeader />
      <main>{children}</main>
    </>
  )
}