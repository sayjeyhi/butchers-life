import { IClient, ICommandResult, isSignedTransaction } from '@kadena/client';
import { ICommand, IUnsignedCommand, PactValue } from '@kadena/types';

export function getCmdDataOrFail<T = PactValue>(response: ICommandResult): T {
  if (response.result.status === 'failure') {
    console.error(response.result.error);
    throw new Error(JSON.stringify(response.result.error));
  } else {
    return response.result.data as T;
  }
}

function createDirtyReadOrFail(client: IClient) {
  return async <T = PactValue>(tx: IUnsignedCommand | ICommand): Promise<T> => {
    const res = await client.dirtyRead(tx);
    return getCmdDataOrFail<T>(res);
  };
}

function createLocalOrFail(client: IClient) {
  return async <T = PactValue>(tx: IUnsignedCommand | ICommand): Promise<T> => {
    const res = await client.local(tx);
    return getCmdDataOrFail<T>(res);
  };
}

function createSubmitAndListen(client: IClient) {
  return async <T>(signedTx: IUnsignedCommand | ICommand): Promise<T> => {
    if (isSignedTransaction(signedTx)) {
      const request = await client.submit(signedTx);
      const response = await client.listen(request);
      return getCmdDataOrFail<T>(response);
    } else {
      throw new Error('Not signed');
    }
  };
}

export function createClientUtils(client: IClient) {
  return {
    dirtyReadOrFail: createDirtyReadOrFail(client),
    localOrFail: createLocalOrFail(client),
    submitAndListen: createSubmitAndListen(client),
  };
}
