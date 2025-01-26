import { useInfiniteQuery } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql/graphql-client";
import { GET_USER_ACTIONS } from "@/lib/graphql/queries/actions";
import { ActionsResponse } from "../interfaces/action.interface";

interface UseUserActionsProps {
  signer: string;
  pageSize?: number;
  enabled?: boolean;
}

export const useUserActions = ({
  signer,
  pageSize = 10,
  enabled = true,
}: UseUserActionsProps) => {
  return useInfiniteQuery<ActionsResponse>({
    queryKey: ["user-actions", signer],
    queryFn: async ({ pageParam }) => {
      try {
        return await graphqlClient.request(GET_USER_ACTIONS, {
          first: pageSize,
          after: pageParam,
          signer,
        });
      } catch (error) {
        console.error("Failed to fetch user actions:", {
          signer,
          pageParam,
          error,
        });
        throw error;
      }
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.extrinsics.pageInfo.hasNextPage
        ? lastPage.extrinsics.pageInfo.endCursor
        : undefined,
    staleTime: 1000 * 20, // 20 seconds
    refetchInterval: 1000 * 10, // 10 seconds
    gcTime: 1000 * 60 * 60, // 1 hour
    enabled,
  });
};
