import { useInfiniteQuery } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql/graphql-client";
import { GET_EXTRINSICS } from "@/lib/graphql/queries/extrinsics";
import { ExtrinsicsResponse } from "../interfaces/extrinsic.interface";

interface UseExtrinsicsProps {
  signer: string;
  pageSize?: number;
  enabled?: boolean;
}

export const useExtrinsics = ({
  signer,
  pageSize = 10,
  enabled = true,
}: UseExtrinsicsProps) => {
  return useInfiniteQuery({
    queryKey: ["extrinsics", signer],
    queryFn: async ({ pageParam }) => {
      const response = await graphqlClient.request<ExtrinsicsResponse>(
        GET_EXTRINSICS,
        {
          first: pageSize,
          after: pageParam as string | null,
          signer,
        }
      );
      return response;
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) =>
      lastPage.extrinsics.pageInfo.hasNextPage
        ? lastPage.extrinsics.pageInfo.endCursor
        : null,
    enabled,
    staleTime: 1000 * 20, // 20 seconds
    refetchInterval: 1000 * 10, // 10 seconds
    gcTime: 1000 * 60 * 60, // 1 hour
  });
};
