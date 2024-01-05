import { ChainId } from '@kadena/types';

export const appEnv = {
  CHAINWEB_RPC_URL: import.meta.env.APP_CHAINWEB_RPC_URL ?? 'http://localhost:8080',
  NETWORK_ID: import.meta.env.APP_NETWORK_ID ?? 'fast-development',
  CHAIN_ID: (import.meta.env.APP_CHAIN_ID ?? '1') as ChainId,
  NAMESPACE: import.meta.env.APP_NAMESPACE ?? 'free',
  ADMIN_ACCOUNT: import.meta.env.APP_ADMIN_ACCOUNT ?? '0:0',
  ADMIN_ACCOUNT_PUBLIC_KEY: import.meta.env.APP_ADMIN_ACCOUNT_PUBLIC_KEY ?? '0',
  ADMIN_ACCOUNT_PRIVATE_KEY: import.meta.env.APP_ADMIN_ACCOUNT_PRIVATE_KEY ?? '0',
};
