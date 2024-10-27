type Props = {
  children: React.ReactNode
}

export default function InventoryLayout({ children }: Props) {
  return (
    <div className="pt-4">
      {children}
    </div>
  );
}