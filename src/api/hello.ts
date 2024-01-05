import { Pact, isSignedTransaction } from '@kadena/client';
import { getAccountOrFail, getNetwork, sign } from './wallet';
import { appEnv } from '../appEnv';
import { kdaClient } from './client';

export async function sayHello(name: string): Promise<string> {
  const pactCommand = `
    (free.hello-world.say-hello "${name}")
  `;
  const account = await getAccountOrFail();
  const { networkId } = await getNetwork();
  const transaction = Pact.builder
    .execution(pactCommand)
    .addSigner(account.publicKey)
    .setMeta({ chainId: appEnv.CHAIN_ID, senderAccount: account.account })
    .setNetworkId(networkId)
    .createTransaction();

  const signedTx = await sign(transaction);
  if (isSignedTransaction(signedTx)) {
    const transactionDescriptor = await kdaClient.submit(signedTx);
    const response = await kdaClient.listen(transactionDescriptor);
    // const response = await kdaClient.submit(signedTx);
    if (response.result.status === 'failure') {
      throw response.result.error;
    } else {
      console.log(response.result);
      return response.result.data as string;
    }
  }
}
