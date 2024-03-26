import { Pact } from '@kadena/client';
import { appEnv } from '../appEnv';
import { submitAndListen } from './client';
import { getAccountOrFail, getNetwork, sign } from './wallet';

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
  return submitAndListen(signedTx);
}
