import {FaChevronLeft} from 'react-icons/fa6';

export function MakeBackButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className="p-3 font-titles font-bold uppercase flex items-center gap-3"
      onClick={onClick}
    >
      <FaChevronLeft /> {label}
    </button>
  );
}
