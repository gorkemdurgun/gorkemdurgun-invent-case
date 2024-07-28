import { PiDotsThreeCircleDuotone as DotIcon } from "react-icons/pi";

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full  border-t border-b border-white">
        <DotIcon className="w-24 h-24 text-white" />
      </div>
    </div>
  );
};

export default Loading;
