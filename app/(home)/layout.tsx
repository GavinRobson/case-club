import Header from "@/components/navigation/header";

type Props = {
  children: React.ReactNode;
}

export default function HomePageLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main className="px-14">{children}</main>
    </>
  )
}