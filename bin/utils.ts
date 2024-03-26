import { createClient, createSignWithKeypair } from '@kadena/client';

import { createClientUtils } from '../src/api/clientUtils';
import { env } from './env';

interface GetApiHostParams {
  chainId?: string;
  networkId?: string;
}

export function getApiHost({ chainId = env.APP_CHAIN_ID, networkId = env.APP_NETWORK_ID }: GetApiHostParams = {}) {
  const isPactServer = env.APP_PACT_SERVER === true;
  return isPactServer
    ? env.APP_CHAINWEB_RPC_URL
    : `${env.APP_CHAINWEB_RPC_URL}/chainweb/0.0/${networkId}/chain/${chainId}/pact`;
}

export const kdaClient = createClient(getApiHost);
export function getAccountKey(account: string) {
  return account.split(':')[1];
}

export const signWithAdmin = createSignWithKeypair({
  publicKey: env.APP_ADMIN_ACCOUNT_PUBLIC_KEY,
  secretKey: env.APP_ADMIN_ACCOUNT_PRIVATE_KEY,
});

export const signWithFundingAccount = createSignWithKeypair({
  publicKey: env.APP_FUNDING_ACCOUNT_PUBLIC_KEY,
  secretKey: env.APP_FUNDING_ACCOUNT_PRIVATE_KEY,
});

export const { dirtyReadOrFail, localOrFail, submitAndListen } = createClientUtils(kdaClient);
