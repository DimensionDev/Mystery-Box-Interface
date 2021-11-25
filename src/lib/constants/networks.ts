import { ethereumIcon, binanceIcon, polygonIcon } from '../../components/Icon/icon-data';
import { ChainId as ChainIdEnum } from './chainId';

export const supportedChains = [ChainIdEnum.Mainnet, ChainIdEnum.Rinkeby, ChainIdEnum.Matic];

export const networkNames: Record<number, string> = {
  1: 'ETH',
  3: 'Ropsten',
  4: 'Rinkeby',
  5: 'Kovan',
  42: 'Kovan Testnet',
  56: 'BSC',
  77: 'Sokol Testnet',
  97: 'BSC Testnet',
  100: 'xDai Chain',
  137: 'Matic Mainnet',
  80001: 'Matic Testnet Mumbai',
};

type ChainId = keyof typeof networkNames;
type Network = {
  chainId: ChainId;
  name: string;
  iconUrl: string;
};

export const networkIcons: Record<number, string> = {
  [ChainIdEnum.Matic]: ethereumIcon,
  [ChainIdEnum.Rinkeby]: ethereumIcon,
  [ChainIdEnum.BSC]: binanceIcon,
  [ChainIdEnum.Matic]: polygonIcon,
};

export const networks: Network[] = ([1, 4] as const).map((chainId) => {
  return {
    chainId,
    name: networkNames[chainId],
    iconUrl: networkIcons[chainId],
  };
});

export const networkExplorers: Record<number, string> = {
  [ChainIdEnum.Matic]: 'https://etherscan.io',
  [ChainIdEnum.Rinkeby]: 'https://rinkeby.etherscan.io',
  [ChainIdEnum.BSC]: 'https://bscscan.com',
  [ChainIdEnum.Matic]: 'https://polygonscan.com',
};

export function isSupportedChain(chainId: number) {
  return supportedChains.includes(chainId);
}

export const networkColors: Partial<Record<ChainIdEnum, string>> = {
  [ChainIdEnum.Mainnet]: '#1C68F3',
  [ChainIdEnum.Matic]: '#773EE1',
  [ChainIdEnum.Ropsten]: '#FF4182',
  [ChainIdEnum.Rinkeby]: '#F5BB3B',
  [ChainIdEnum.Arbitrum]: '#2496EE',
  [ChainIdEnum.BSC]: '#FBDA3C',
  [ChainIdEnum.Kovan]: '#8559FF',
  [ChainIdEnum.xDai]: '#48A9A6',
};

export function getNetworkColor(chainId: ChainIdEnum) {
  return networkColors[chainId] ?? networkColors[ChainIdEnum.Mainnet];
}
