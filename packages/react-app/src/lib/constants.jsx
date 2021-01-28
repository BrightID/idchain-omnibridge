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
  1: 'ETH Mainnet',
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
    name: 'Dai Stablecoin on IDChain',
    address: '0xE1A400f340bf4eeDbc4Bbb553f1BFf7Ec4656E3e',
    symbol: 'DAI',
    decimals: 18,
    chainId: 74,
  },
  1: {
    name: 'Subs',
    address: '0x61CEAc48136d6782DBD83c09f51E23514D12470a',
    symbol: 'SUBS',
    decimals: 0,
    chainId: 1,
  },
};

export const graphEndpoints = {
  74: 'https://graph.idchain.one/subgraphs/name/idchain-omnibridge',
  1: 'https://api.thegraph.com/subgraphs/name/crisog/idchain-omnibridge',
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
  74: 'https://raw.githubusercontent.com/IDChain-eth/default-token-list/master/src/tokens/idchain.json',
  1: 'https://raw.githubusercontent.com/IDChain-eth/default-token-list/master/src/tokens/mainnet.json',
};
