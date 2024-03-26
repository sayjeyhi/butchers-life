import { Pact, PactReference, createSignWithKeypair, readKeyset } from '@kadena/client';
import { PactNumber } from '@kadena/pactjs';
import { IPactDecimal } from '@kadena/types';
import { appEnv } from '../appEnv';
import { getCmdDataOrFail, kdaClient, submitAndListen } from './client';
import { IAccount } from './types';
import { getNetwork } from './wallet';

interface ICreateTokenIdInput {
  policies?: string[];
  uri: string;
  precision?: number;
  creator: IAccount;
}

export async function createTokenId({
  policies = [],
  uri,
  precision = 0,
  creator,
}: ICreateTokenIdInput): Promise<string> {
  const { networkId } = await getNetwork();
  const transaction = Pact.builder
    .execution(
      Pact.modules['marmalade-v2.ledger']['create-token-id'](
        { precision, uri, policies },
        readKeyset('creation-guard'),
      ),
    )
    .addKeyset('creation-guard', 'keys-all', ...creator.keys.map((key) => key.publicKey))
    .setMeta({ chainId: appEnv.CHAIN_ID, senderAccount: creator.account })
    .setNetworkId(networkId)
    .createTransaction();

  const res = await kdaClient.dirtyRead(transaction);
  return getCmdDataOrFail(res) as string;
}

interface ICreateTokenInput {
  policies?: string[];
  uri: string;
  tokenId: string;
  precision?: number;
  creator: IAccount;
}

export async function createToken({ policies = [], uri, tokenId, precision = 0, creator }: ICreateTokenInput) {
  const { networkId } = await getNetwork();
  const transaction = Pact.builder
    .execution(
      Pact.modules['marmalade-v2.ledger']['create-token'](
        tokenId,
        new PactNumber(precision).toPactInteger(),
        uri,
        policies.length > 0 ? ([policies.join(' ')] as unknown as PactReference) : ([] as unknown as PactReference),
        readKeyset('creation-guard'),
      ),
    )
    .addData('fungible', 'free.meat')
    .addKeyset('creation-guard', 'keys-all', ...creator.keys.map((key) => key.publicKey))
    .addSigner(
      creator.keys.map((key) => key.publicKey),
      (signFor) => [
        signFor('coin.GAS'),
        signFor('marmalade-v2.ledger.CREATE-TOKEN', tokenId, {
          pred: 'keys-all',
          keys: creator.keys.map((key) => key.publicKey),
        }),
      ],
    )
    .setMeta({ senderAccount: creator.account, chainId: creator.chainId })
    .setNetworkId(networkId)
    .createTransaction();
  const sign = createSignWithKeypair(creator.keys);
  const signedTx = await sign(transaction);
  return submitAndListen(signedTx);
}

export interface IMintTokenInput {
  tokenId: string;
  creator: string;
  guard: IAccount;
  amount: IPactDecimal;
}

export async function mintToken({ tokenId, creator, guard, amount }: IMintTokenInput) {
  const { networkId } = await getNetwork();
  const tx = Pact.builder
    .execution(Pact.modules['marmalade-v2.ledger'].mint(tokenId, creator, readKeyset('guard'), amount))
    .addKeyset('guard', 'keys-all', ...guard.keys.map((key) => key.publicKey))
    .addSigner(
      guard.keys.map((key) => key.publicKey),
      (signFor) => [signFor('coin.GAS'), signFor('marmalade-v2.ledger.MINT', tokenId, creator, amount)],
    )
    .setMeta({ senderAccount: guard.account, chainId: guard.chainId })
    .setNetworkId(networkId)
    .createTransaction();

  const sign = createSignWithKeypair(guard.keys);
  const signedTx = await sign(tx);
  return submitAndListen(signedTx);
}
