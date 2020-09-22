import {
  ambs,
  chainUrls,
  defaultTokens,
  defaultTokensUrl,
  graphEndpoints,
  mediators,
  networkNames,
} from './constants';

export const getBridgeNetwork = chainId => {
  switch (chainId) {
    case 1:
      return 74;
    case 74:
    default:
      return 1;
  }
};

export const isxDaiChain = chainId => {
  switch (chainId) {
    case 1:
      return false;
    case 74:
      default:
      return true;
  }
};

export const getDefaultToken = chainId => {
  switch (chainId) {
    case 1:
      return defaultTokens[1];
    case 74:
    default:
      return defaultTokens[74];
  }
};

export const getMediatorAddress = chainId => {
  switch (chainId) {
    case 1:
      return mediators[1];
    case 74:
    default:
      return mediators[74];
  }
};

export const getNetworkName = chainId => {
  switch (chainId) {
    case 1:
      return networkNames[1];
    case 74:
    default:
      return networkNames[74];
  }
};

export const getAMBAddress = chainId => {
  switch (chainId) {
    case 1:
      return ambs[1];
    case 74:
    default:
      return ambs[74];
  }
};

export const getGraphEndpoint = chainId => {
  switch (chainId) {
    case 1:
      return graphEndpoints[1];
    case 74:
    default:
      return graphEndpoints[74];
  }
};

export const getRPCUrl = chainId => {
  switch (chainId) {
    case 1:
      return chainUrls[1].rpc;
    case 74:
    default:
      return chainUrls[74].rpc;
  }
};

export const getExplorerUrl = chainId => {
  switch (chainId) {
    case 1:
      return chainUrls[1].explorer;
    case 74:
    default:
      return chainUrls[74].explorer;
  }
};

export const getMonitorUrl = (chainId, hash) => {
  const url = 'https://alm-xdai.herokuapp.com/';
  switch (chainId) {
    case 1:
      return `${url}1/${hash}`;
    case 74:
    default:
      return `${url}74/${hash}`;
  }
};

export const uniqueTokens = list => {
  const seen = {};
  return list.filter(function isDuplicate(token) {
    const { address } = token;
    const lowerCaseAddress = address.toLowerCase();
    const isDuplicateItem = Object.prototype.hasOwnProperty.call(
      seen,
      lowerCaseAddress,
    )
      ? false
      : (seen[lowerCaseAddress] = true);
    return isDuplicateItem;
  });
};

export const getTokenListUrl = chainId => {
  switch (chainId) {
    case 1:
      return defaultTokensUrl[1];
    default:
    case 74:
      return defaultTokensUrl[74];
  }
};

export const formatValue = (num, dec) => {
  const number = window.BigInt(num);
  const round = window.BigInt(10 ** Number(dec));
  const value = Number((number * window.BigInt(1000)) / round) / 1000;
  return value.toFixed(3);
};

export const parseValue = (val, dec) => {
  if (!val) {
    return window.BigInt(0);
  }
  const value = Number(val);
  const round = window.BigInt(10 ** Number(dec));
  return (window.BigInt(Math.floor(value * 100)) * round) / window.BigInt(100);
};
