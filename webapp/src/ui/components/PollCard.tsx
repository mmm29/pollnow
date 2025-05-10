export type PollCardProps = {
  title: string;
  description?: string;
  onClick?: VoidFunction;
};

export function PollCard({ title, description, onClick }: PollCardProps) {
  return (
    <div
      className="overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition"
      onClick={onClick}
    >
      <div className="px-4 py-5 sm:px-6">{title}</div>
      {description && (
        <div className="bg-gray-50 px-4 py-5 sm:p-6">{description}</div>
      )}
    </div>
  );
}
