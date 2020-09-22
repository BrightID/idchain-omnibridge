import React from 'react';

import { CONFIG } from '../config';
import { NetworkIcon } from '../icons/NetworkIcon';

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';

export const networkOptions = [
  {
    value: 74,
    key: 0,
    bridge: { chainId: 1, name: 'ETH Mainnet' },
    label: 'IDChain',
    name: 'IDChain',
    icon: <NetworkIcon />,
  },
  {
    value: 1,
    key: 1,
    bridge: { chainId: 74, name: 'IDChain' },
    label: 'Mainnet',
    name: 'ETH Mainnet',
    icon: <NetworkIcon />,
  },
];

export const networkNames = {
  74: 'IDChain',
  1: 'ETH Mainnet'
};

export const chainUrls = {
  74: {
    rpc: 'https://idchain.one/rpc/',
    explorer: 'https://explorer.idchain.one/',
    chainId: 74,
    name: 'IDChain',
  },
  1: {
    rpc: `https://mainnet.infura.io/v3/${CONFIG.infuraId}`,
    explorer: 'https://etherscan.io',
    chainId: 1,
    name: 'ETH Mainnet',
  },
};

export const defaultTokens = {
  74: {
    name: 'Wrapped EIDI',
    address: '0x5B160edBa6119828c5B065804e86111921323f9c',
    symbol: 'WEIDI',
    decimals: 18,
    chainId: 74,
  },
  1: {
    name: 'Stake',
    address: '0x0Ae055097C6d159879521C384F1D2123D1f195e6',
    symbol: 'STAKE',
    decimals: 18,
    chainId: 1,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0Ae055097C6d159879521C384F1D2123D1f195e6/logo.png',
  }
};

export const graphEndpoints = {
  74: 'https://subgraph.idchain.daohaus.club/subgraphs/name/idchain-omnibridge',
  1: 'https://api.thegraph.com/subgraphs/name/dan13ram/mainnet-omnibridge'
};

export const mediators = {
  74: '0x920D59E4F79478D8A188b6736333535c765d50cd',
  1: '0xc47192E48F75B612c792833C8b54Ad6BE319af90',
};

export const ambs = {
  74: '0x98e4b879f07c1BEac8592216c903fb33e828C214',
  1: '0x33d136C1501709Ee020D7A8CA56D44DAcb15e227',
};

export const defaultTokensUrl = {
  74: 'https://raw.githubusercontent.com/1Hive/default-token-list/master/uniswap-xdai.tokenlist.json',
  1: 'https://raw.githubusercontent.com/raid-guild/default-token-list/master/src/tokens/mainnet.json',
};
