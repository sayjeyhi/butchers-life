import { Pact, readKeyset } from '@kadena/client';
import { appEnv } from '../appEnv';
import { getCmdDataOrFail, kdaClient, submitAndListen } from './client';
import { getAccountOrFail, getNetwork, quickSign } from './wallet';

export async function createPrincipal() {
  // get network id from eckowallet
  const { networkId } = await getNetwork();
  // get account from eckowallet
  const { account, publicKey } = await getAccountOrFail();
  const pactCommand = `(create-principal (read-keyset 'account-guard))`;
  const transaction = Pact.builder
    .execution(pactCommand)
    .addKeyset('account-guard', 'keys-all', publicKey)
    .setMeta({ chainId: appEnv.CHAIN_ID, senderAccount: account })
    .setNetworkId(networkId)
    .createTransaction();
  const res = await kdaClient.dirtyRead(transaction);
  return getCmdDataOrFail<string>(res);
}
export async function getMeatAccount(account: string) {
  const { networkId } = await getNetwork();
  const transaction = Pact.builder
    .execution(Pact.modules['free.meat'].details(account))
    .setMeta({ chainId: appEnv.CHAIN_ID, senderAccount: account })
    .setNetworkId(networkId)
    .createTransaction();
  const res = await kdaClient.dirtyRead(transaction);
  return getCmdDataOrFail(res) as {
    balance: string;
    account: string;
  };
}

export async function accountExists(account: string) {
  try {
    await getMeatAccount(account);
    return true;
  } catch (e) {
    return false;
  }
}

export async function createAccount() {
  const { networkId } = await getNetwork();
  const { account, publicKey } = await getAccountOrFail();
  const transaction = Pact.builder
    .execution(Pact.modules['free.meat']['create-account'](account, readKeyset('account-guard')))
    .addKeyset('account-guard', 'keys-all', publicKey)
    .addSigner(publicKey, (signFor) => [signFor('coin.GAS')])
    .setMeta({ chainId: appEnv.CHAIN_ID, senderAccount: account })
    .setNetworkId(networkId)
    .createTransaction();
  const signedTx = await quickSign(transaction);
  return submitAndListen(signedTx);
}

export async function fundAccount(account: string, amount: string) {
  const exist = await accountExists(account);
  if (!exist) {
    await createAccount();
  }
  const { networkId } = await getNetwork();
  const { publicKey } = await getAccountOrFail();

  const transaction = Pact.builder
    .execution(
      Pact.modules['free.meat'].fund(account, {
        decimal: amount,
      }),
    )
    .addSigner(publicKey, (signFor) => [signFor('coin.GAS'), signFor('free.meat.CREDIT')])
    .setMeta({ chainId: appEnv.CHAIN_ID, senderAccount: account })
    .setNetworkId(networkId)
    .createTransaction();
  const signedTx = await quickSign(transaction);
  return submitAndListen(signedTx);
}
