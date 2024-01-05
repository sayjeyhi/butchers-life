import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { accountExists, createAccount, fundAccount, getMeatAccount } from '../meat';
import { useWalletAccount } from './useWalletAccount';

export function useMeatAccount() {
  const { account: walletAccount, isConnected } = useWalletAccount();
  const accountAddress = walletAccount?.account ?? '';
  const client = useQueryClient();
  const { data: exists } = useQuery({
    enabled: isConnected,
    queryKey: ['meatAccountExists'],
    queryFn: () => accountExists(accountAddress),
  });

  const { data: account } = useQuery({
    enabled: isConnected && exists,
    queryKey: ['meatAccount'],
    queryFn: () => getMeatAccount(accountAddress),
  });

  const { mutateAsync: create } = useMutation({
    mutationKey: ['createMeatAccount'],
    mutationFn: async () => createAccount(),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['meatAccountExists', 'meatAccount'],
      });
    },
  });

  const { mutateAsync: fund } = useMutation({
    mutationKey: ['fundMeatAccount'],
    mutationFn: async (amount: string) => fundAccount(accountAddress, amount),
  });

  return { create, fund, account, exists };
}
