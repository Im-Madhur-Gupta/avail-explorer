/**
 * Query to fetch paginated extrinsics for a specific signer
 */
export const GET_EXTRINSICS = `
query GetLatestTransactions($first: Int!, $after: Cursor, $signer: String!) {
  extrinsics(
    first: $first
    after: $after
    orderBy: TIMESTAMP_DESC
    filter: {
      signer: { equalTo: $signer }
    }
  ) {
    edges {
      node {
        id
        module
        timestamp
        txHash
        argsName
        argsValue
        extrinsicIndex
        hash
        success
        signature
        signer
        feesRounded
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
`;
