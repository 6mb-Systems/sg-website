export const metadata = {
  title: "SuperGuardian Studio",
  description: "Content management for SuperGuardian Education Hub",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-white">
      {children}
    </div>
  );
}
