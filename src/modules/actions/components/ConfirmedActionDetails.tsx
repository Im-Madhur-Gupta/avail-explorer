"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { useAction } from "@/modules/actions/hooks/useAction";
import ActionDetailsPageLoader from "@/modules/actions/components/ActionDetailsPageLoader";
import ActionDetailsError from "@/modules/actions/components/ActionDetailsError";
import ActionDetailsContent from "./ActionDetailsContent";

interface ConfirmedActionDetailsProps {
  hash: string;
}

const ConfirmedActionDetails = ({ hash }: ConfirmedActionDetailsProps) => {
  const router = useRouter();
  const { data, isLoading, isError } = useAction(hash);

  const node = data?.extrinsics.edges[0].node;

  const renderContent = () => {
    if (isLoading) {
      return <ActionDetailsPageLoader />;
    }

    if (isError || !node) {
      return <ActionDetailsError />;
    }

    return <ActionDetailsContent action={node} />;
  };

  return (
    <div className="max-w-screen-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Action Details
        </h1>
        <p className="text-muted-foreground">
          View detailed information about an action
        </p>
      </div>

      {renderContent()}
    </div>
  );
};

export default ConfirmedActionDetails;
