type Props = {
  children: React.ReactNode
}

export default function HistoryLayout({ children }: Props) {
  return (
    <div className="pt-4">
      {children}
    </div>
  );
}