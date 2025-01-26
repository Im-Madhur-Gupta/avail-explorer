/**
 * GraphQL client configuration for Avail indexer
 * Requires NEXT_PUBLIC_AVAIL_INDEXER_URL environment variable to be set
 */
import { GraphQLClient } from "graphql-request";

const AVAIL_INDEXER_URL = process.env.NEXT_PUBLIC_AVAIL_INDEXER_URL;

if (!AVAIL_INDEXER_URL) {
  throw new Error("NEXT_PUBLIC_AVAIL_INDEXER_URL is not set");
}

/** GraphQL client instance for making queries to Avail indexer */
export const graphqlClient = new GraphQLClient(AVAIL_INDEXER_URL);
