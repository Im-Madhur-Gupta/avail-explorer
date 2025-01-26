# Avail Explorer

Avail Explorer allows users to interact seamlessly with the Avail Network. Users can view on-chain actions (`extrinsics`), submit data, and perform balance transfers with ease.

Live version of the app can be accessed here: [https://availexplorer.vercel.app/](https://availexplorer.vercel.app/).

## Features

- **Wallet Connection**:
  - Supports Polkadot wallet with status checks and automatic reconnection if the wallet is already connected.
- **Perform Actions**:
  - Allows users to perform actions like balance transfers and data submissions.
  - Includes form validation, fee estimation, transaction status updates.
- **Real-time Action Tracking**:
  - Leverages a WebSocket connection to the Avail RPC for live updates.
- **Action History Page**:
  - Displays a user’s past actions with infinite scroll for smooth navigation.
- **Action Data Lookup Page**:
  - Fetches details of an action using a transaction hash.
  - Lists out call parameters with their decoded values, presented alongside relevant action data.
- **Optimized Fetch Queries**:
  - Optimized data fetching by using appropriate values for `gcTime`, `staleTime`, and `refetchInterval` in queries.

## Tech Stack

- **Framework**: `Next.js with TypeScript`
- **Styling**: `TailwindCSS`
- **Components**: `Shadcn`
- **State Management**: `Zustand`
- **API Calls**: `React Query`, `graphql-request`
- **Blockchain**: `avail-js-sdk`, `@polkadot/api`, `@polkadot/extension-dapp`

## Getting Started

Follow these steps to set up the project locally:

### 1. Install Dependencies

Ensure you have `yarn` installed. Then run:

```bash
yarn
```

### 2. Set Up Environment Variables

The application requires specific environment variables. Use the `.env.example` file as a reference to create a `.env.local` file with the necessary values.

#### Required Environment Variables:

- `NEXT_PUBLIC_AVAIL_INDEXER_URL`:
  - Avail's GraphQL-based Indexer API Endpoint
  - For development environment use: `https://turing-indexer.avail.so/`
- `NEXT_PUBLIC_AVAIL_RPC_WS_URL`:
  - Avail's RPC WebSocket Endpoint
  - For development environment use: `wss://turing-rpc.avail.so/ws`

### 3. Run the Application

Start the application in development mode:

```bash
yarn dev
```

## UI Screenshots

### Balance Transfer Form
<img width="1429" alt="1" src="https://github.com/user-attachments/assets/0b96b4b6-0a7b-4f5b-83d0-d26a88ae1032" />

### Data Submission Form
<img width="1429" alt="3" src="https://github.com/user-attachments/assets/35345639-79f7-4f5d-b439-0118e70751a8" />

### Real-time Action Tracking
<img width="1429" alt="4" src="https://github.com/user-attachments/assets/d3e4d80f-7233-4e81-af7c-6152c6e16788" />

### Action History Page
<img width="1429" alt="6" src="https://github.com/user-attachments/assets/9e252c15-3fa5-4852-af07-0394159dc501" />

### Action Data Lookup Page
<img width="1429" alt="5" src="https://github.com/user-attachments/assets/11f7bd8c-b91e-435e-8a7a-85cd8855e11a" />
