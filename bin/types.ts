#!/bin/env bash
// set -e
//
// # npx pactjs contract-generate --contract=marmalade-v2.ledger --api=https://api.testnet.chainweb.com/chainweb/0.0/testnet04/chain/0/pact
// npx pactjs contract-generate --file ./pact/meat-token.pact

import { exec } from 'node:child_process';
import { readFile, rm, writeFile } from 'node:fs/promises';
import { promisify } from 'node:util';
import { env } from './env';
import { createPrincipalNamespace } from './ns';
import { getApiHost } from './utils';

const execAsync = promisify(exec);
const NAMESPACE_PLACEHOLDER = '{{NAMESPACE}}';

export async function embedNamespace(file: string, namespace: string) {
  const code = await readFile(file, 'utf8');
  const newCode = code.replaceAll(NAMESPACE_PLACEHOLDER, namespace);
  const tmpPath = file.replace('.pact', '.tmp.pact');
  await writeFile(tmpPath, newCode);
  return tmpPath;
}

export async function generateTypes(path: string, namespace?: string) {
  const ns = namespace ?? (await createPrincipalNamespace());
  console.log('Using namespace:', ns);
  const tmpPath = await embedNamespace(path, ns);
  await execAsync(`npx pactjs contract-generate --file ${tmpPath}`);
  // cleanup
  await rm(tmpPath);
}

export async function generateContractTypes(contract: string) {
  await execAsync(
    `npx pactjs contract-generate --contract=${contract} --api=${getApiHost({
      chainId: env.APP_CHAIN_ID,
      networkId: env.APP_NETWORK_ID,
    })}`,
  );
}
