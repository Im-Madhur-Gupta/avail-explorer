import { Loader2 } from "lucide-react";

const ActionHistoryPageLoader = () => {
  return (
    <div className="flex justify-center items-center p-4 text-gray-500">
      <Loader2 className="w-5 h-5 mr-3 animate-spin" />
      Loading more actions...
    </div>
  );
};

export default ActionHistoryPageLoader;
