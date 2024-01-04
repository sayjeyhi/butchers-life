/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly APP_NETWORK_ID: string;
  readonly APP_CHAIN_ID: ChainId;
  readonly APP_CHAINWEB_RPC_URL: string;
  readonly APP_NAMESPACE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
