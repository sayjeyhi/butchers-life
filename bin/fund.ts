import { Pact, createSignWithKeypair, isSignedTransaction } from '@kadena/client';
import { env } from './env';

import { getAccountKey, kdaClient } from './utils';

const signTransaction = createSignWithKeypair({
  publicKey: env.APP_FUNDING_ACCOUNT_PUBLIC_KEY,
  secretKey: env.APP_FUNDING_ACCOUNT_PRIVATE_KEY,
});

async function accountExists(account: string) {
  console.log('Checking if account exists...', account);
  const transaction = Pact.builder
    .execution(`(coin.details "${account}")`)
    .setMeta({ chainId: env.APP_CHAIN_ID })
    .setNetworkId(env.APP_NETWORK_ID)
    .createTransaction();

  try {
    const response = await kdaClient.dirtyRead(transaction);
    const { result } = response;
    if (result.status === 'success') {
      return true;
    } else {
      console.error(result.error);
      return false;
    }
  } catch (e: unknown) {
    console.error((e as Error).message);
    return false;
  }
}

export async function fund(recipient: string, amount: string, preflight = false) {
  const fundingAccount = env.APP_FUNDING_ACCOUNT;
  const fundingAccountPublicKey = env.APP_FUNDING_ACCOUNT_PUBLIC_KEY;

  // check if the account exists
  const accountFound = await accountExists(recipient);
  console.log('Account found:', accountFound);
  const transaction = Pact.builder
    .execution(
      accountFound
        ? Pact.modules.coin['transfer'](fundingAccount, recipient, {
            decimal: amount,
          })
        : Pact.modules.coin['transfer-create'](fundingAccount, recipient, () => '(read-keyset "ks")', {
            decimal: amount,
          }),
    )
    .addData('ks', {
      keys: [getAccountKey(recipient)],
      pred: 'keys-all',
    })
    .addSigner(fundingAccountPublicKey, (withCapability) => [
      withCapability('coin.GAS'),
      withCapability('coin.TRANSFER', fundingAccount, recipient, {
        decimal: amount,
      }),
    ])
    .setMeta({ chainId: env.APP_CHAIN_ID, senderAccount: fundingAccount })
    .setNetworkId(env.APP_NETWORK_ID)
    .createTransaction();

  const signedTx = await signTransaction(transaction);
  if (preflight) {
    const preflightResponse = await kdaClient.preflight(signedTx);
    console.log(preflightResponse);
  }
  if (isSignedTransaction(signedTx)) {
    const transactionDescriptor = await kdaClient.submit(signedTx);
    const response = await kdaClient.listen(transactionDescriptor);
    if (response.result.status === 'failure') {
      throw response.result.error;
    } else {
      console.log(response.result);
    }
  }
}
