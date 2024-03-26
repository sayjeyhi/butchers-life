import { createClient, createSignWithKeypair } from '@kadena/client';

import { appEnv } from '../appEnv';
import { createClientUtils } from './clientUtils';

interface GetApiHostParams {
  chainId?: string;
  networkId?: string;
}

export function getApiHost({ chainId = appEnv.CHAIN_ID, networkId = appEnv.NETWORK_ID }: GetApiHostParams = {}) {
  return `${appEnv.CHAINWEB_RPC_URL}/chainweb/0.0/${networkId}/chain/${chainId}/pact`;
}

export const kdaClient = createClient(getApiHost());

export const { dirtyReadOrFail, localOrFail, submitAndListen } = createClientUtils(kdaClient);

export const adminAccount = {
  publicKey: appEnv.ADMIN_ACCOUNT_PUBLIC_KEY,
  secretKey: appEnv.ADMIN_ACCOUNT_PRIVATE_KEY,
};

export const signWithAdminAccount = createSignWithKeypair({
  publicKey: appEnv.ADMIN_ACCOUNT_PUBLIC_KEY,
  secretKey: appEnv.ADMIN_ACCOUNT_PRIVATE_KEY,
});
