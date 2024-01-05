import type { ChainId, IKeyPair } from '@kadena/types';

export interface IAccount {
  account: string;
  chainId?: ChainId;
  keys: IKeyPair[];
}
