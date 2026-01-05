import { FiEdit2 } from "react-icons/fi";
import { GoGrabber } from "react-icons/go";

interface FileCardProps {
  image: string;
  name: string;
  date: string;
  size: string;
}

const Card = ({ image, name, date, size }: FileCardProps) => {
  return (
    <div className="w-44 rounded-xl overflow-hidden bg-[#2b2b2b] shadow-md">
      <div className="relative h-32">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover"
        />
        <button className="absolute top-2 right-2 bg-black/60 p-1.5 rounded-full text-white cursor-grab">
          <GoGrabber size={14} />
        </button>
      </div>

      <div className="p-3 text-white">
        <p className="text-sm font-medium truncate">{name}</p>
        <p className="text-xs text-gray-400">{date}</p>
        <p className="text-xs text-gray-400">{size}</p>

        <div className="flex justify-end mt-1">
          <FiEdit2 size={14} />
        </div>
      </div>
    </div>
  );
};

export default Card;