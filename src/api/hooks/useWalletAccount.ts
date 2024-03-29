import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { connect as connectWallet, disconnect as disconnectWallet, getNetwork, isConnected } from '../wallet';

export function useWalletAccount() {
  const client = useQueryClient();
  const { data: { network, status } = {} } = useQuery({
    queryKey: ['walletAccountStatus'],
    queryFn: async () => {
      const status = await isConnected();
      const network = await getNetwork();
      return { status, network };
    },
  });

  const { data, mutateAsync: connect } = useMutation({
    mutationKey: ['connectWalletAccount'],
    mutationFn: async () => connectWallet(),
  });

  const { mutateAsync: disconnect } = useMutation({
    mutationKey: ['disconnectWalletAccount'],
    mutationFn: async () => {
      await disconnectWallet();
    },
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['walletAccountStatus'],
      });
    },
  });

  return { account: status?.account || data, network, isConnected: !!status?.isConnected, connect, disconnect };
}
