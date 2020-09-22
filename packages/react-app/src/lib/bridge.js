import { BigNumber, Contract } from 'ethers';

import { fetchConfirmations } from './amb';
import { getBridgeNetwork, getMediatorAddress, isxDaiChain } from './helpers';
import { getEthersProvider } from './providers';
import { fetchTokenBalance, transferAndCallToken } from './token';

export const fetchBridgedTokenAddress = async (fromChainId, tokenAddress) => {
  const isxDai = isxDaiChain(fromChainId);
  const xDaiChainId = isxDai ? fromChainId : getBridgeNetwork(fromChainId);
  const ethersProvider = getEthersProvider(xDaiChainId);
  const mediatorAddress = getMediatorAddress(xDaiChainId);
  const abi = [
    'function foreignTokenAddress(address) view returns (address)',
    'function homeTokenAddress(address) view returns (address)',
  ];
  const mediatorContract = new Contract(mediatorAddress, abi, ethersProvider);

  if (isxDai) {
    return mediatorContract.foreignTokenAddress(tokenAddress);
  }
  return mediatorContract.homeTokenAddress(tokenAddress);
};

export const fetchToAmount = async (fromToken, toToken, fromAmount) => {
  if (fromAmount <= 0 || !fromToken || !toToken) return 0;
  const isxDai = isxDaiChain(toToken.chainId);
  const xDaiChainId = isxDai
    ? toToken.chainId
    : getBridgeNetwork(toToken.chainId);
  const tokenAddress = isxDai ? toToken.address : fromToken.address;
  const ethersProvider = getEthersProvider(xDaiChainId);
  const mediatorAddress = getMediatorAddress(xDaiChainId);
  const abi = [
    'function FOREIGN_TO_HOME_FEE() view returns (uint256)',
    'function HOME_TO_FOREIGN_FEE() view returns (uint256)',
    'function calculateFee(bytes32, address, uint256) view returns (uint256)',
  ];
  const mediatorContract = new Contract(mediatorAddress, abi, ethersProvider);

  try {
    const feeType = isxDai
      ? await mediatorContract.FOREIGN_TO_HOME_FEE()
      : await mediatorContract.HOME_TO_FOREIGN_FEE();
    const fee = await mediatorContract.calculateFee(
      feeType,
      tokenAddress,
      fromAmount,
    );
    return window.BigInt(fromAmount) - window.BigInt(fee);
  } catch (error) {
    // eslint-disable-next-line
    console.log({ amountError: error });
    return fromAmount;
  }
};

export const fetchToToken = async (fromToken, account) => {
  const toTokenAddress = await fetchBridgedTokenAddress(
    fromToken.chainId,
    fromToken.address,
  );

  const toChainId = getBridgeNetwork(fromToken.chainId);
  const isxDai = isxDaiChain(toChainId);
  return {
    name: isxDai ? `${fromToken.name} on IDChain` : fromToken.name.slice(0, -8),
    address: toTokenAddress,
    symbol: fromToken.symbol,
    decimals: fromToken.decimals,
    chainId: toChainId,
    logoURI: '',
    balance: await fetchTokenBalance(
      { chainId: toChainId, address: toTokenAddress },
      account,
    ),
  };
};

export const fetchTokenLimits = async (token, account) => {
  const ethersProvider = getEthersProvider(token.chainId);
  const mediatorAbi = [
    'function isTokenRegistered(address) view returns (bool)',
    'function minPerTx(address) view returns (uint256)',
    'function maxPerTx(address) view returns (uint256)',
    'function dailyLimit(address) view returns (uint256)',
  ];
  const mediatorAddress = getMediatorAddress(token.chainId);
  const mediatorContract = new Contract(
    mediatorAddress,
    mediatorAbi,
    ethersProvider,
  );
  let isRegistered = false;
  let balance = 0;
  // ETH/ERC20 Default Limits
  const isxDai = isxDaiChain(token.chainId);
  let minPerTx = BigNumber.from(10).pow(
    isxDai ? token.decimals : token.decimals - 3,
  );
  if (minPerTx.lt(1)) {
    minPerTx = BigNumber.from(1);
  }
  let maxPerTx = BigNumber.from(10).pow(token.decimals + 9);
  let dailyLimit = BigNumber.from(10).pow(token.decimals + 18);
  try {
    [isRegistered, balance] = await Promise.all([
      mediatorContract.isTokenRegistered(token.address),
      fetchTokenBalance(token, account),
    ]);
    if (isRegistered) {
      [minPerTx, maxPerTx, dailyLimit] = await Promise.all([
        mediatorContract.minPerTx(token.address),
        mediatorContract.maxPerTx(token.address),
        mediatorContract.dailyLimit(token.address),
      ]);
    }
  } catch (error) {
    // eslint-disable-next-line
    console.log({ tokenError: error });
  }
  return {
    ...token,
    isRegistered,
    balance,
    minPerTx,
    maxPerTx,
    dailyLimit,
  };
};

export const relayTokens = async (ethersProvider, token, amount) => {
  const mediatorAddress = getMediatorAddress(token.chainId);
  const abi = ['function relayTokens(address, uint256)'];
  const mediatorContract = new Contract(
    mediatorAddress,
    abi,
    ethersProvider.getSigner(),
  );

  return mediatorContract.relayTokens(token.address, amount);
};

export const transferTokens = async (ethersProvider, token, amount) => {
  const confirmsPromise = fetchConfirmations(token.chainId);
  const txPromise = isxDaiChain(token.chainId)
    ? transferAndCallToken(ethersProvider, token, amount)
    : relayTokens(ethersProvider, token, amount);
  const totalConfirms = parseInt(await confirmsPromise, 10);
  const tx = await txPromise;

  return [tx, totalConfirms];
};
