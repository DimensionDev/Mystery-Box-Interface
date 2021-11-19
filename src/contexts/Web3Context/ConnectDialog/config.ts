import { ChainId } from '@/lib';
import { ProviderType } from '../providers';

export const connectableChains = [
  {
    name: 'Ethereum',
    chainId: ChainId.Mainnet,
    iconType: 'ethereumChain',
  },
  {
    name: 'Rinkeby',
    chainId: ChainId.Rinkeby,
    iconType: 'ethereumChain',
  },
  // {
  //   name: 'polygon',
  //   chainId: ChainId.Matic,
  //   iconType: 'polygonChain',
  // },
  // {
  //   name: 'binance',
  //   chainId: ChainId.BSC,
  //   iconType: 'binanceChain',
  // },
] as const;

export const connectableWallets = [
  {
    id: 'metamask',
    type: ProviderType.Injected,
    iconType: 'metamaskWallet',
  },
  {
    id: 'walletconnect',
    type: ProviderType.WalletConnect,
    iconType: 'walletconnect',
  },
  // {
  //   id: 'mask',
  //   type: 'injected',
  //   iconType: 'maskWallet',
  // },
] as const;
