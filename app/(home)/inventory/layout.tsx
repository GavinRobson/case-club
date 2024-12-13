type Props = {
  children: React.ReactNode
}

export default function InventoryLayout({ children }: Props) {
  return (
    <div className="py-4">
      {children}
    </div>
  );
}