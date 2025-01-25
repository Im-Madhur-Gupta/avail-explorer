import { FileText } from "lucide-react";

const EmptyActionHistory = () => {
  return (
    <div className="text-center py-12">
      <div className="w-24 h-24 mx-auto mb-6 text-gray-400">
        <FileText className="w-full h-full" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No Actions Yet
      </h3>
      <p className="text-gray-500 max-w-sm mx-auto">
        Once you perform actions on the Avail network, they will appear here.
      </p>
    </div>
  );
};

export default EmptyActionHistory;
