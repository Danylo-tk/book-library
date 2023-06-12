export const Chip = ({ label }: { label: string }) => {
  return (
    <span className="text-gray-400 text-xs font-medium mr-2 px-2.5 py-1 rounded-sm border border-solid border-gray-400">
      {label}
    </span>
  );
};
