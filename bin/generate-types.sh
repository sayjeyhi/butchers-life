#!/bin/env bash
set -e
npx pactjs contract-generate --contract=coin --api=https://api.testnet.chainweb.com/chainweb/0.0/testnet04/chain/0/pact
# npx pactjs contract-generate --contract=marmalade-v2.ledger --api=https://api.testnet.chainweb.com/chainweb/0.0/testnet04/chain/0/pact
npx pactjs contract-generate --file ./pact/meat-token.pact
