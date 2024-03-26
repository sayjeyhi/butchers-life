import { Pact } from '@kadena/client';
import { genKeyPair } from '@kadena/cryptography-utils';
import { describe, it } from 'node:test';

import assert from 'node:assert';
import { deployContractFile } from '../bin/deploy';
import { prepareTestEnv } from '../bin/perpareEnv';
import { dirtyReadOrFail } from '../bin/utils';

const keys = genKeyPair();
describe('meat', () => {
  it('should be tasty', async () => {
    await prepareTestEnv();
    await deployContractFile(`${process.cwd()}/pact/hello-world.pact`, {});
    const transaction = Pact.builder
      .execution('(free.hello-world.say-hello "Salama")')
      // .addSigner()
      .setMeta({ chainId: '1', senderAccount: keys.publicKey })
      .createTransaction();

    const s = await dirtyReadOrFail(transaction);
    assert.strictEqual(s, 'Hello, Salama!');
  });
});
