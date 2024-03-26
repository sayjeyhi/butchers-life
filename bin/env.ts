import type { ChainId } from '@kadena/client';
import { bool, cleanEnv, str, url } from 'envalid';

export const env = cleanEnv(process.env, {
  APP_CHAINWEB_RPC_URL: url({ default: 'http://localhost:8080' }),
  APP_NETWORK_ID: str({
    default: 'fast-development',
  }),
  APP_CHAIN_ID: str({
    default: '1',
    choices: Array.from({ length: 20 }, (_, i) => `${i + 1}`) as ChainId[],
  }),
  APP_ADMIN_ACCOUNT: str(),
  APP_ADMIN_ACCOUNT_PUBLIC_KEY: str(),
  APP_ADMIN_ACCOUNT_PRIVATE_KEY: str(),
  APP_FUNDING_ACCOUNT: str({ default: 'sender00' }),
  APP_FUNDING_ACCOUNT_PUBLIC_KEY: str({
    default: '368820f80c324bbc7c2b0610688a7da43e39f91d118732671cd9c7500ff43cca',
  }),
  APP_FUNDING_ACCOUNT_PRIVATE_KEY: str({
    default: '251a920c403ae8c8f65f59142316af3c82b631fba46ddea92ee8c95035bd2898',
  }),
  APP_PACT_SERVER: bool({ default: false }),
});
