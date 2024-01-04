import { createClient } from '@kadena/client';

import { appEnv } from '../appEnv';

interface GetApiHostParams {
  chainId?: string;
  networkId?: string;
}

export function getApiHost({ chainId = appEnv.CHAIN_ID, networkId = appEnv.NETWORK_ID }: GetApiHostParams = {}) {
  return `${appEnv.CHAINWEB_RPC_URL}/chainweb/0.0/${networkId}/chain/${chainId}/pact`;
}

export const kdaClient = createClient(getApiHost());
