import { join } from 'path';
import { deployContract, deployContractFile, runPact } from './deploy';

const pactRoot = join(process.cwd(), 'pact');
function getContractPath(contract: string) {
  return join(pactRoot, contract);
}
export async function prepareTestEnv() {
  try {
    const isInitiated = await runPact('(test.test-env.is-ready)');
    if (isInitiated) {
      console.log('Test env is already initiated');
      return;
    }
  } catch (e) {
    console.log('Test env is not initiated');
  }
  await deployContractFile(getContractPath('env/tools/basic-guards.pact'), {});
  await deployContract(
    `
(use basic-guards)
(define-namespace 'util GUARD_SUCCESS GUARD_SUCCESS)
(define-namespace 'free GUARD_SUCCESS GUARD_SUCCESS)
(define-namespace 'kip GUARD_SUCCESS GUARD_SUCCESS)
(define-namespace 'user GUARD_SUCCESS GUARD_SUCCESS)
(define-namespace 'test GUARD_SUCCESS GUARD_SUCCESS)
  `,
    {},
  );
  await deployContractFile(getContractPath('env/tools/test-env.pact'), {});

  //   (load "root/fungible-v2.pact")
  // (load "root/fungible-xchain-v1.pact")+
  // (load "root/gas-payer-v1.pact")
  // (load "root/coin-v5.pact")
  // (create-table coin-table)

  // ; On the Kadena blockchain the guards modules are loaded
  // ;in both root and util namespaces
  // (load "util/guards.pact")
  // (load "util/guards1.pact")

  // (namespace 'kip)
  // (load "kip/account-protocols-v1.pact")

  // (namespace 'util)
  // (load "util/fungible-util.pact")
  // (load "util/guards.pact")
  // (load "util/guards1.pact")
  await deployContractFile(getContractPath('env/root/fungible-v2.pact'), {});
  await deployContractFile(getContractPath('env/root/fungible-xchain-v1.pact'), {});
  await deployContractFile(getContractPath('env/root/gas-payer-v1.pact'), {});
  await deployContractFile(getContractPath('env/root/coin-v5.pact'), {});
  // await deployContract(`(create-table coin-table)`, {});

  // kip
  await deployContractFile(getContractPath('env/kip/account-protocols-v1.pact'), {});

  // utils
  await deployContractFile(getContractPath('env/util/fungible-util.pact'), {});
  await deployContractFile(getContractPath('env/util/guards.pact'), {});
  await deployContractFile(getContractPath('env/util/guards1.pact'), {});
  await deployContract('(test.test-env.finished)', {});
}
