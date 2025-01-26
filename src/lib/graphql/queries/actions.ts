import { gql } from "graphql-request";

/**
 * Common fragment for action fields to maintain consistency
 * and reduce duplication across queries
 */
export const ACTION_FIELDS = gql`
  fragment ActionFields on Extrinsic {
    id
    blockId
    txHash
    module
    call
    success
    isSigned
    extrinsicIndex
    hash
    timestamp
    signer
    feesRounded
    argsName
    argsValue
  }
`;

/**
 * Query to fetch paginated actions (extrinsics) for a specific signer
 */
export const GET_USER_ACTIONS = gql`
  ${ACTION_FIELDS}
  query GetLatestUserActions($first: Int!, $after: Cursor, $signer: String!) {
    extrinsics(
      first: $first
      after: $after
      orderBy: TIMESTAMP_DESC
      filter: {
        signer: { equalTo: $signer }
        call: {
          in: [
            "submitData"
            "transferKeepAlive"
            "transferAllowDeath"
            "transferAll"
          ]
        }
      }
    ) {
      edges {
        node {
          ...ActionFields
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

/**
 * Query to fetch a single action (extrinsic) by ID
 */
export const GET_ACTION = gql`
  ${ACTION_FIELDS}
  query GetAction($txHash: String!) {
    extrinsics(first: 1, filter: { txHash: { equalTo: $txHash } }) {
      edges {
        node {
          ...ActionFields
        }
      }
    }
  }
`;
