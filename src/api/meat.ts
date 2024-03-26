import { Pact, readKeyset } from '@kadena/client';
import { appEnv } from '../appEnv';
import { adminAccount, kdaClient, submitAndListen } from './client';
import { getCmdDataOrFail } from './clientUtils';
import { getAccountOrFail, getNetwork, quickSign } from './wallet';

export async function getMeatAccount(account: string) {
  const { networkId } = await getNetwork();
  const transaction = Pact.builder
    .execution(Pact.modules['n_f9342f37b39aa40135530aad8f34ee9de9fc6c3c.meat'].details(account))
    .setMeta({ chainId: appEnv.CHAIN_ID, senderAccount: account, gasLimit: 1000000 })
    .setNetworkId(networkId)
    .createTransaction();
  const res = await kdaClient.dirtyRead(transaction);
  return getCmdDataOrFail(res) as {
    balance: string;
    account: string;
  };
}

export async function meatAccountExists(account: string) {
  try {
    const res = await getMeatAccount(account);
    return res.account === account;
  } catch (e) {
    return false;
  }
}

export async function createMeatAccount() {
  const { networkId } = await getNetwork();
  const { account, publicKey } = await getAccountOrFail();
  const transaction = Pact.builder
    .execution(
      Pact.modules['n_f9342f37b39aa40135530aad8f34ee9de9fc6c3c.meat']['create-account'](
        account,
        readKeyset('account-guard'),
      ),
    )
    .addKeyset('account-guard', 'keys-all', publicKey)
    .addSigner(publicKey, (signFor) => [
      signFor('coin.GAS'),
      signFor(
        `n_f9342f37b39aa40135530aad8f34ee9de9fc6c3c.meat-gas-station.GAS_PAYER`,
        account,
        { int: 0 },
        { decimal: '0.0' },
      ),
    ])
    .setMeta({ chainId: appEnv.CHAIN_ID, senderAccount: account })
    .setNetworkId(networkId)
    .createTransaction();
  const signedTx = await quickSign(transaction);
  return submitAndListen(signedTx);
}

export async function fundMeatAccount(account: string, amount: string) {
  const exist = await meatAccountExists(account);
  if (!exist) {
    await createMeatAccount();
  }
  const { networkId } = await getNetwork();
  const transaction = Pact.builder
    .execution(
      Pact.modules['n_f9342f37b39aa40135530aad8f34ee9de9fc6c3c.meat'].fund(account, {
        decimal: amount,
      }),
    )
    .addSigner(adminAccount.publicKey, (signFor) => [
      signFor('coin.GAS'),
      signFor(
        `n_f9342f37b39aa40135530aad8f34ee9de9fc6c3c.meat-gas-station.GAS_PAYER`,
        account,
        { int: 0 },
        { decimal: '0.0' },
      ),
      signFor('n_f9342f37b39aa40135530aad8f34ee9de9fc6c3c.meat.CREDIT'),
    ])
    .setMeta({ chainId: appEnv.CHAIN_ID, senderAccount: adminAccount.publicKey })
    .setNetworkId(networkId)
    .createTransaction();
  const signedTx = await quickSign(transaction);
  return submitAndListen(signedTx);
}

interface MeatAccount {
  key: string;
  account: string;
  balance: string;
}
export async function getMeatAccounts() {
  const { networkId } = await getNetwork();
  const tx = Pact.builder
    .execution(Pact.modules['n_f9342f37b39aa40135530aad8f34ee9de9fc6c3c.meat']['list-accounts']())
    .setNetworkId(networkId)
    .setMeta({ chainId: appEnv.CHAIN_ID, gasLimit: 1000000 })
    .createTransaction();

  const res = await kdaClient.dirtyRead(tx);
  return getCmdDataOrFail(res) as MeatAccount[];
}

export async function getMeatLeaderBoard() {
  const { networkId } = await getNetwork();
  const tx = Pact.builder
    .execution(Pact.modules['n_f9342f37b39aa40135530aad8f34ee9de9fc6c3c.meat']['leaderboard']())
    .setNetworkId(networkId)
    .setMeta({ chainId: appEnv.CHAIN_ID, gasLimit: 1000000 })
    .createTransaction();

  const res = await kdaClient.dirtyRead(tx);
  return getCmdDataOrFail(res) as MeatAccount[];
}
