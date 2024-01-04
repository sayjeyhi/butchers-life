#!/bin/env bash
set -e
bunx pactjs contract-generate --contract=coin --api=https://api.testnet.chainweb.com/chainweb/0.0/testnet04/chain/0/pact
bunx pactjs contract-generate --file ./pact/election.pact
bunx pactjs contract-generate --file ./pact/election-gas-station.pact
