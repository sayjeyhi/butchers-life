import { readFile } from 'fs/promises';
import { deployContract } from './deploy';
import { fund } from './fund';

import { defineCommand, runMain } from 'citty';
import { env } from './env';
import { createPrincipalNamespace } from './ns';
import { generateContractTypes, generateTypes } from './types';

const deployCommand = defineCommand({
  meta: {
    name: 'deploy',
    description: 'Deploy contract',
  },
  args: {
    contract: {
      type: 'positional',
      name: 'contract',
      description: 'Contract file',
    },
    upgrade: {
      type: 'boolean',
      name: 'upgrade',
      description: 'Upgrade',
      defaultValue: false,
    },
    init: {
      type: 'boolean',
      name: 'init',
      description: 'Init',
      defaultValue: false,
    },
    namespace: {
      type: 'string',
      name: 'namespace',
      alias: 'n',
      required: false,
      description: 'Namespace',
    },
    preflight: {
      type: 'boolean',
      name: 'preflight',
      description: 'Preflight',
      defaultValue: false,
    },
  },
  run: async ({ args }) => {
    const { contract, preflight, init, upgrade, namespace } = args;
    console.log('Deploying contract...', contract);
    const contractSource = await readFile(contract, 'utf-8');
    await deployContract(contractSource, {
      preflight,
      init,
      upgrade,
      namespace,
    });
  },
});

const fundCommand = defineCommand({
  meta: {
    name: 'fund',
    description: 'Fund existing account with amount or create account and fund it',
  },
  args: {
    recipient: {
      type: 'positional',
      name: 'recipient',
      description: 'Recipient account',
    },
    amount: {
      type: 'positional',
      name: 'amount',
      description: 'Amount',
    },
    preflight: {
      type: 'boolean',
      name: 'preflight',
      description: 'Preflight',
      defaultValue: false,
    },
  },
  run: async ({ args }) => {
    console.log(args);
    const { recipient, amount, preflight } = args;
    console.log('Funding account...', recipient, amount);
    await fund(recipient, amount, preflight);
  },
});

const fundAdminCommand = defineCommand({
  meta: {
    name: 'fund-admin',
    description: 'Fund Admin account with amount or create account and fund it',
  },
  args: {
    amount: {
      type: 'positional',
      name: 'amount',
      description: 'Amount',
    },
    preflight: {
      type: 'boolean',
      name: 'preflight',
      description: 'Preflight',
      defaultValue: false,
    },
  },
  run: async ({ args }) => {
    console.log(args);
    const { amount, preflight } = args;
    const recipient = env.APP_ADMIN_ACCOUNT;
    console.log('Funding admin account...', recipient, amount);
    await fund(recipient, amount, preflight);
  },
});

const createNamespaceCommand = defineCommand({
  meta: {
    name: 'create-ns',
    description: 'Create principal namespace for admin account',
  },
  run: async () => createPrincipalNamespace(),
});

const generateTypesCommand = defineCommand({
  meta: {
    name: 'generate-types',
    description: 'Generate types for contract',
  },
  args: {
    file: {
      type: 'positional',
      name: 'file',
      required: false,
      description: 'Contract file',
    },
    contract: {
      type: 'string',
      name: 'contract',
      alias: 'c',
      description: 'Deployed contract name',
    },
    namespace: {
      type: 'string',
      name: 'namespace',
      alias: 'n',
      required: false,
      description: 'Namespace',
    },
  },
  run: async ({ args }) => {
    const { file = [], namespace, contract = [] } = args;
    const contracts = Array.isArray(contract) ? contract : contract?.split(',') ?? [];
    const files = Array.isArray(file) ? file : file.split(',') ?? [];
    console.log('contracts', contracts);
    if (contract.length > 0) {
      console.log('Generating types for contract...', contracts.join(', '));
      await Promise.all(contracts.map((c) => generateContractTypes(c)));
    }

    if (files.length > 0) {
      console.log('Generating types for ...', files.join(', '));
      await Promise.all(files.map((f) => generateTypes(f, namespace)));
    }
  },
});

const main = defineCommand({
  meta: {
    name: 'butcher-game-cli',
    description: 'Butcher Game CLI',
    version: '0.0.1',
  },
  subCommands: {
    deploy: deployCommand,
    fund: fundCommand,
    fundAdmin: fundAdminCommand,
    createNs: createNamespaceCommand,
    generateTypes: generateTypesCommand,
  },
});

runMain(main);
