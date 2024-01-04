import { createEckoWalletSign } from '@kadena/client';

export function getAccountKey(account: string) {
  return account.split(':')[1];
}

export const signWithEckoWallet = createEckoWalletSign();
