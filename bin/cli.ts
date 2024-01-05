import { readFile } from 'fs/promises';
import { deployContract } from './deploy';
import { fund } from './fund';

import { defineCommand, runMain } from 'citty';
import { createPrincipalNamespace } from './ns';
import { env } from './env';

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

    preflight: {
      type: 'boolean',
      name: 'preflight',
      description: 'Preflight',
      defaultValue: false,
    },
  },
  run: async ({ args }) => {
    const { contract, preflight } = args;
    console.log('Deploying contract...', contract);
    const contractSource = await readFile(contract, 'utf-8');
    await deployContract(contractSource, preflight);
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

const createPrincipalCommand = defineCommand({
  meta: {
    name: 'create-ns',
    description: 'Create principal namespace for admin account',
  },
  run: async () => createPrincipalNamespace(),
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
    createNs: createPrincipalCommand,
  },
});

runMain(main);
