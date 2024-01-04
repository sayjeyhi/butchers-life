import { Pact, createSignWithKeypair, isSignedTransaction } from '@kadena/client';
import { env } from './env';
import { getAccountKey, kdaClient } from './utils';

const signTransaction = createSignWithKeypair({
  publicKey: env.APP_ADMIN_ACCOUNT_PUBLIC_KEY,
  secretKey: env.APP_ADMIN_ACCOUNT_PRIVATE_KEY,
});

export async function deployContract(code: string, preflight = false) {
  const sender = env.APP_ADMIN_ACCOUNT;
  const transaction = Pact.builder
    .execution(code)
    .setMeta({
      ttl: 28800,
      gasLimit: 100000,
      gasPrice: 0.00000001,
      senderAccount: sender,
      chainId: env.APP_CHAIN_ID,
    })
    .setNetworkId(env.APP_NETWORK_ID)
    .addSigner(getAccountKey(sender))
    .addData('election-admin-keyset', {
      keys: [getAccountKey(sender)],
      pred: 'keys-all',
    })
    .addData('upgrade', false)
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
