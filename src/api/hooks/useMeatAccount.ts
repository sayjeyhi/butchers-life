import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createMeatAccount,
  fundMeatAccount,
  getMeatAccount,
  getMeatAccounts,
  getMeatLeaderBoard,
  meatAccountExists,
} from '../meat';
import { useWalletAccount } from './useWalletAccount';

export function useMeatService() {
  const { account: walletAccount, isConnected } = useWalletAccount();
  const accountAddress = walletAccount?.account ?? '';
  const client = useQueryClient();

  const { data: hasMeatAccount } = useQuery({
    enabled: isConnected,
    queryKey: ['meatAccountExists', accountAddress],
    queryFn: () => meatAccountExists(accountAddress),
  });

  const { data: currentAccount } = useQuery({
    enabled: isConnected && hasMeatAccount,
    queryKey: ['meatAccount', accountAddress],
    queryFn: () => getMeatAccount(accountAddress),
  });

  const { data: leaderBoard } = useQuery({
    enabled: isConnected,
    queryKey: ['getMeatLeaderBoard'],
    queryFn: getMeatLeaderBoard,
  });

  const { data: accounts } = useQuery({
    enabled: isConnected,
    queryKey: ['getMeatAccounts'],
    queryFn: getMeatAccounts,
  });

  const { mutateAsync: createAccount } = useMutation({
    mutationKey: ['createMeatAccount'],
    mutationFn: createMeatAccount,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['meatAccountExists', 'meatAccount'],
      });
    },
  });

  const { mutateAsync: fundAccount } = useMutation({
    mutationKey: ['fundMeatAccount', accountAddress],
    mutationFn: async (amount: string) => fundMeatAccount(accountAddress, amount),
  });

  return { createAccount, fundAccount, currentAccount, hasMeatAccount, leaderBoard, accounts };
}
