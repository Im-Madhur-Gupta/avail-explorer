import { AlertCircle, RotateCw } from "lucide-react";

interface ActionHistoryErrorProps {
  onRetry: () => void;
}

const ActionHistoryError = ({ onRetry }: ActionHistoryErrorProps) => {
  return (
    <div className="text-center py-12">
      <div className="w-24 h-24 mx-auto mb-6 text-red-400">
        <AlertCircle className="w-full h-full" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Something went wrong
      </h3>
      <p className="text-gray-500 max-w-sm mx-auto mb-6">
        We couldn&apos;t load your action history. Please try again.
      </p>
      <button
        onClick={onRetry}
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        <RotateCw className="w-4 h-4 mr-2" />
        Try Again
      </button>
    </div>
  );
};

export default ActionHistoryError;
