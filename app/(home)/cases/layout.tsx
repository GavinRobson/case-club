type Props = {
  children: React.ReactNode
}

export default function CasesLayout({ children }: Props) {
  return (
    <div className="pt-10">
      {children}
    </div>
  );
}