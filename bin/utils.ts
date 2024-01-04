import { createClient } from '@kadena/client';

import { env } from './env';

interface GetApiHostParams {
  chainId?: string;
  networkId?: string;
}

export function getApiHost({ chainId = env.APP_CHAIN_ID, networkId = env.APP_NETWORK_ID }: GetApiHostParams = {}) {
  return `${env.APP_CHAINWEB_RPC_URL}/chainweb/0.0/${networkId}/chain/${chainId}/pact`;
}

export const kdaClient = createClient(getApiHost());
export function getAccountKey(account: string) {
  return account.split(':')[1];
}
