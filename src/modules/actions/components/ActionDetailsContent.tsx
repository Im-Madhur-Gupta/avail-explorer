import { formatDistanceToNow } from "date-fns";

import { getTxHashExplorerLink } from "@/modules/common/utils/link.utils";
import { getBlockExplorerLink } from "@/modules/common/utils/link.utils";
import ExternalLink from "@/modules/common/components/ExternalLink";
import type { Action } from "@/modules/actions/interfaces/action.interface";

export interface ActionDetailsContentProps {
  action: Action;
}

const ActionDetailsContent = ({ action }: ActionDetailsContentProps) => {
  const {
    blockId,
    txHash,
    module,
    call,
    success,
    feesRounded,
    timestamp,
    signer,
    isSigned,
    extrinsicIndex,
    argsName,
    argsValue,
  } = action;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="rounded-lg border bg-card shadow-sm">
          <div className="p-6 space-y-4">
            <h3 className="text-lg font-medium">Basic Information</h3>
            <dl className="space-y-4">
              <div className="grid grid-cols-[25%_75%] gap-4">
                <dt className="text-sm font-medium text-gray-500">Time</dt>
                <dd className="text-sm text-gray-900">
                  {formatDistanceToNow(new Date(timestamp + "Z"), {
                    addSuffix: true,
                  })}
                </dd>
              </div>
              <div className="grid grid-cols-[25%_75%] gap-4">
                <dt className="text-sm font-medium text-gray-500">Block</dt>
                <dd className="text-sm text-gray-900">
                  <ExternalLink href={getBlockExplorerLink(blockId)} size="sm">
                    {blockId}
                  </ExternalLink>
                </dd>
              </div>
              <div className="grid grid-cols-[25%_75%] gap-4">
                <dt className="text-sm font-medium text-gray-500">Hash</dt>
                <dd className="text-sm text-gray-900 break-all">
                  <ExternalLink href={getTxHashExplorerLink(txHash)} size="sm">
                    {`${txHash.slice(0, 20)}...${txHash.slice(-20)}`}
                  </ExternalLink>
                </dd>
              </div>
              <div className="grid grid-cols-[25%_75%] gap-4">
                <dt className="text-sm font-medium text-gray-500">Module</dt>
                <dd className="text-sm text-gray-900">{module}</dd>
              </div>
              <div className="grid grid-cols-[25%_75%] gap-4">
                <dt className="text-sm font-medium text-gray-500">Call</dt>
                <dd className="text-sm text-gray-900">{call}</dd>
              </div>
              <div className="grid grid-cols-[25%_75%] gap-4">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="text-sm">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      success
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {success ? "Success" : "Failed"}
                  </span>
                </dd>
              </div>
              <div className="grid grid-cols-[25%_75%] gap-4">
                <dt className="text-sm font-medium text-gray-500">Fee</dt>
                <dd className="text-sm text-gray-900">{feesRounded} AVAIL</dd>
              </div>
              <div className="grid grid-cols-[25%_75%] gap-4">
                <dt className="text-sm font-medium text-gray-500">
                  Action Index
                </dt>
                <dd className="text-sm text-gray-900">{extrinsicIndex}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border bg-card shadow-sm">
          <div className="p-6 space-y-4">
            <h3 className="text-lg font-medium">Arguments</h3>
            <dl className="space-y-4">
              {argsName.map((name: string, index: number) => (
                <div key={name} className="grid grid-cols-[25%_75%] gap-4">
                  <dt className="text-sm font-medium text-gray-500">{name}</dt>
                  <dd className="text-sm text-gray-900 break-all">
                    {argsValue[index]}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="rounded-lg border bg-card shadow-sm">
          <div className="p-6 space-y-4">
            <h3 className="text-lg font-medium">Additional Details</h3>
            <dl className="space-y-4">
              <div className="grid grid-cols-[25%_75%] gap-4">
                <dt className="text-sm font-medium text-gray-500">Signer</dt>
                <dd className="text-sm text-gray-900 break-all">{signer}</dd>
              </div>
              <div className="grid grid-cols-[25%_75%] gap-4">
                <dt className="text-sm font-medium text-gray-500">Signed</dt>
                <dd className="text-sm text-gray-900">
                  {isSigned ? "Yes" : "No"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionDetailsContent;
