import {
  ICommand,
  ICommandResult,
  IUnsignedCommand,
  createClient,
  createSignWithKeypair,
  isSignedTransaction,
} from '@kadena/client';

import { PactValue } from '@kadena/types';
import { appEnv } from '../appEnv';
import { IAccount } from './types';

interface GetApiHostParams {
  chainId?: string;
  networkId?: string;
}

export function getApiHost({ chainId = appEnv.CHAIN_ID, networkId = appEnv.NETWORK_ID }: GetApiHostParams = {}) {
  return `${appEnv.CHAINWEB_RPC_URL}/chainweb/0.0/${networkId}/chain/${chainId}/pact`;
}

export const kdaClient = createClient(getApiHost());

export function getCmdDataOrFail<T = PactValue>(response: ICommandResult): T {
  if (response.result.status === 'failure') {
    throw response.result.error;
  } else {
    return response.result.data as T;
  }
}

export async function submitAndListen<T>(signedTx: IUnsignedCommand | ICommand): Promise<T> {
  if (isSignedTransaction(signedTx)) {
    const request = await kdaClient.submit(signedTx);
    const response = await kdaClient.listen(request);
    return getCmdDataOrFail<T>(response);
  } else {
    throw new Error('Not signed');
  }
}

export const fundingAccount: IAccount = {
  keys: [
    {
      publicKey: '368820f80c324bbc7c2b0610688a7da43e39f91d118732671cd9c7500ff43cca',
      secretKey: '251a920c403ae8c8f65f59142316af3c82b631fba46ddea92ee8c95035bd2898',
    },
  ],
  account: 'sender00',
};

export const signWithFundingAccount = createSignWithKeypair(fundingAccount.keys[0]);
