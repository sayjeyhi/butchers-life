import { Pact, createSignWithKeypair, isSignedTransaction } from '@kadena/client';
import { env } from './env';
import { getAccountKey, kdaClient } from './utils';

const signTransaction = createSignWithKeypair({
  publicKey: env.APP_ADMIN_ACCOUNT_PUBLIC_KEY,
  secretKey: env.APP_ADMIN_ACCOUNT_PRIVATE_KEY,
});

export async function createPrincipalNamespace(account = env.APP_ADMIN_ACCOUNT) {
  const pactCommand = `
    (let ((ns-name (ns.create-principal-namespace (read-keyset 'admin-keyset))))
      (define-namespace ns-name (read-keyset 'admin-keyset ) (read-keyset 'admin-keyset))
    )
  `;
  const transaction = Pact.builder
    .execution(pactCommand)
    .addData('admin-keyset', {
      keys: [getAccountKey(account)],
      pred: 'keys-all',
    })
    .addSigner(getAccountKey(account))
    .setMeta({ chainId: env.APP_CHAIN_ID, senderAccount: account })
    .setNetworkId(env.APP_NETWORK_ID)
    .createTransaction();

  const signedTx = await signTransaction(transaction);

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
