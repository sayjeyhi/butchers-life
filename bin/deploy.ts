import { Pact } from '@kadena/client';
import { readFile } from 'fs/promises';
import { env } from './env';
import { dirtyReadOrFail, getAccountKey, kdaClient, signWithAdmin, submitAndListen } from './utils';

interface DeployContractParams {
  upgrade?: boolean;
  preflight?: boolean;
  init?: boolean;
  namespace?: string;
}

export async function deployContract(
  code: string,
  { upgrade = false, preflight = false, init = false, namespace }: DeployContractParams,
) {
  const admin = env.APP_ADMIN_ACCOUNT;
  const transaction = Pact.builder
    .execution(code)
    .setMeta({
      ttl: 28800,
      gasLimit: 100000,
      gasPrice: 0.00000001,
      senderAccount: admin,
      chainId: env.APP_CHAIN_ID,
    })
    .setNetworkId(env.APP_NETWORK_ID)
    .addSigner(getAccountKey(admin))
    .addKeyset('admin-keyset', 'keys-all', getAccountKey(admin))
    .addData('upgrade', upgrade)
    .addData('init', init)
    .addData('namespace', namespace)
    .addData('ns', namespace)
    .createTransaction();

  const signedTx = await signWithAdmin(transaction);

  if (preflight) {
    const preflightResponse = await kdaClient.preflight(signedTx);
    console.log(preflightResponse);
  }

  return submitAndListen(signedTx);
}

export async function runPact(code: string) {
  const admin = env.APP_ADMIN_ACCOUNT;
  const transaction = Pact.builder
    .execution(code)
    .setMeta({
      ttl: 28800,
      gasLimit: 100000,
      gasPrice: 0.00000001,
      senderAccount: admin,
      chainId: env.APP_CHAIN_ID,
    })
    .setNetworkId(env.APP_NETWORK_ID)
    // .addSigner(getAccountKey(admin))
    // .addKeyset('admin-keyset', 'keys-all', getAccountKey(admin))
    .createTransaction();

  return dirtyReadOrFail(transaction);
}

export async function deployContractFile(filePath: string, params: DeployContractParams) {
  const code = await readFile(filePath, 'utf-8');
  console.log(`Deploying contract from file: ${filePath}`);
  return deployContract(code, params);
}
