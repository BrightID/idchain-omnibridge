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
      return 100;
    case 74:
      return 4;
    case 42:
      return 77;
    case 4:
      return 74;
    case 77:
      return 42;
    case 100:
    default:
      return 1;
  }
};

export const isxDaiChain = chainId => {
  switch (chainId) {
    case 1:
      return false;
    case 42:
      return false;
    case 4:
      return false;
    case 77:
      return false;
    case 100:
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
      return defaultTokens[74];
    case 4:
      return defaultTokens[4];
    case 42:
      return defaultTokens[42];
    case 77:
      return defaultTokens[77];
    case 100:
    default:
      return defaultTokens[100];
  }
};

export const getMediatorAddress = chainId => {
  switch (chainId) {
    case 1:
      return mediators[1];
    case 4:
      return mediators[4];
    case 74:
      return mediators[74];
    case 42:
      return mediators[42];
    case 77:
      return mediators[77];
    case 100:
    default:
      return mediators[100];
  }
};

export const getNetworkName = chainId => {
  switch (chainId) {
    case 1:
      return networkNames[1];
    case 4:
      return networkNames[4];
    case 42:
      return networkNames[42];
    case 74:
      return networkNames[74];
    case 77:
      return networkNames[77];
    case 100:
    default:
      return networkNames[100];
  }
};

export const getAMBAddress = chainId => {
  switch (chainId) {
    case 1:
      return ambs[1];
    case 4:
      return ambs[4]; 
    case 74:
      return ambs[74];
    case 42:
      return ambs[42];
    case 77:
      return ambs[77];
    case 100:
    default:
      return ambs[100];
  }
};

export const getGraphEndpoint = chainId => {
  switch (chainId) {
    case 1:
      return graphEndpoints[1];
    case 74:
      return graphEndpoints[74];
    case 4:
      return graphEndpoints[4];
    case 42:
      return graphEndpoints[42];
    case 77:
      return graphEndpoints[77];
    case 100:
    default:
      return graphEndpoints[100];
  }
};

export const getRPCUrl = chainId => {
  switch (chainId) {
    case 1:
      return chainUrls[1].rpc;
    case 4:
      return chainUrls[4].rpc;
    case 74:
      return chainUrls[74].rpc;
    case 42:
      return chainUrls[42].rpc;
    case 77:
      return chainUrls[77].rpc;
    case 100:
    default:
      return chainUrls[100].rpc;
  }
};

export const getExplorerUrl = chainId => {
  switch (chainId) {
    case 1:
      return chainUrls[1].explorer;
    case 4:
      return chainUrls[4].explorer;
    case 74:
      return chainUrls[74].explorer;
    case 42:
      return chainUrls[42].explorer;
    case 77:
      return chainUrls[77].explorer;
    case 100:
    default:
      return chainUrls[100].explorer;
  }
};

export const getMonitorUrl = (chainId, hash) => {
  const url = 'https://alm-xdai.herokuapp.com/';
  const testUrl = 'https://alm-test-amb.herokuapp.com/';
  switch (chainId) {
    case 1:
      return `${url}1/${hash}`;
    case 4:
      return `${url}4/${hash}`;
    case 74:
      return `${url}1/${hash}`;
    case 42:
      return `${testUrl}42/${hash}`;
    case 77:
      return `${testUrl}77/${hash}`;
    case 100:
    default:
      return `${url}100/${hash}`;
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
    case 4:
      return defaultTokensUrl[4];
    case 74:
      return defaultTokensUrl[4];
    case 42:
      return defaultTokensUrl[42];
    case 77:
      return defaultTokensUrl[77];
    default:
    case 100:
      return defaultTokensUrl[100];
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
