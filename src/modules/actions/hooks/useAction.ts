import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GET_ACTION } from "@/lib/graphql/queries/actions";
import {
  ActionResponse,
  ActionsResponse,
  Action,
} from "../interfaces/action.interface";
import { graphqlClient } from "@/lib/graphql/graphql-client";
import { hexToString } from "../utils/conversion.utils";
import { formatAmount } from "@/modules/common/utils/amount.utils";
import { TransferType } from "../enums/transfer-type.enum";

const deserializeActionData = (action: Action): Action => {
  return {
    ...action,
    argsValue: action.argsValue.map((value: string, index: number) => {
      // Handle data submission
      if (action.call === "submitData" && action.argsName[index] === "data") {
        return hexToString(value);
      }

      // Handle transfers with 18 decimals
      const isTransferCall = [
        TransferType.KeepAlive,
        TransferType.AllowDeath,
        TransferType.All,
      ].includes(action.call as TransferType);

      if (isTransferCall && action.argsName[index] === "value") {
        return `${formatAmount(value, 18)} AVAIL`;
      }

      return value;
    }),
  };
};

export const useAction = (txHash: string) => {
  const queryClient = useQueryClient();

  return useQuery<ActionResponse>({
    queryKey: ["action", txHash],
    queryFn: async () => {
      try {
        // Check infinite query cache first
        const cachedQueries = queryClient.getQueriesData<{
          pages: ActionsResponse[];
          pageParams: (string | null)[];
        }>({ queryKey: ["user-actions"] });

        // Search through all pages in the infinite query
        const cachedAction = cachedQueries
          .flatMap(([, data]) => data?.pages ?? [])
          .flatMap((page) => page?.extrinsics.edges ?? [])
          .find(({ node }) => node.txHash === txHash);

        if (cachedAction) {
          return {
            extrinsics: {
              edges: [{ node: deserializeActionData(cachedAction.node) }],
            },
          };
        }

        const response = await graphqlClient.request<ActionResponse>(
          GET_ACTION,
          { txHash }
        );

        if (!response?.extrinsics?.edges?.[0]) {
          console.error("Action not found in response:", { txHash, response });
          throw new Error(`Action not found: ${txHash}`);
        }

        // Deserialize before returning
        const action = response.extrinsics.edges[0].node;
        return {
          extrinsics: {
            edges: [{ node: deserializeActionData(action) }],
          },
        };
      } catch (error) {
        console.error("Failed to fetch action:", { txHash, error });
        throw error;
      }
    },
    staleTime: 1000 * 20,
    refetchInterval: 1000 * 10,
    gcTime: 1000 * 60 * 60,
    retry: 5, // For recently confirmed transactions, allow time for the indexer to catch up. Retry up to 5 times to ensure accurate processing.
  });
};
