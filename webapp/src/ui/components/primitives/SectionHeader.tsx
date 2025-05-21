export function SectionHeader({ title }: { title: string }) {
  return (
    <>
      <h2 className="text-xl font-bold tracking-tight text-gray-800">
        {title}
      </h2>
    </>
  );
}
