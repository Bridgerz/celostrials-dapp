import { getApy } from "../apr"
import { BigNumber } from "@ethersproject/bignumber"
import {
  getBalanceNumber,
  getFullDisplayBalance,
  getDecimalAmount,
} from "./format"

export const convertSharesToCake = (
  shares: BigNumber,
  cakePerFullShare: BigNumber,
  decimals = 18,
  decimalsToRound = 3,
) => {
  const sharePriceNumber = getBalanceNumber(cakePerFullShare, decimals)
  const amountInCake = BigNumber.from(shares.mul(sharePriceNumber))
  const cakeAsNumberBalance = getBalanceNumber(amountInCake, decimals)
  const cakeAsBigNumber = getDecimalAmount(
    BigNumber.from(cakeAsNumberBalance),
    decimals,
  )
  const cakeAsDisplayBalance = getFullDisplayBalance(
    amountInCake,
    decimals,
    decimalsToRound,
  )
  return { cakeAsNumberBalance, cakeAsBigNumber, cakeAsDisplayBalance }
}

export const convertCakeToShares = (
  cake: BigNumber,
  cakePerFullShare: BigNumber,
  decimals = 18,
  decimalsToRound = 3,
) => {
  const sharePriceNumber = getBalanceNumber(cakePerFullShare, decimals)
  const amountInShares = BigNumber.from(cake.div(sharePriceNumber))
  const sharesAsNumberBalance = getBalanceNumber(amountInShares, decimals)
  const sharesAsBigNumber = getDecimalAmount(
    BigNumber.from(sharesAsNumberBalance),
    decimals,
  )
  const sharesAsDisplayBalance = getFullDisplayBalance(
    amountInShares,
    decimals,
    decimalsToRound,
  )
  return { sharesAsNumberBalance, sharesAsBigNumber, sharesAsDisplayBalance }
}

const AUTO_VAULT_COMPOUND_FREQUENCY = 5000
const MANUAL_POOL_AUTO_COMPOUND_FREQUENCY = 0

export const getAprData = (pool: any, performanceFee: number) => {
  const { isAutoVault, apr } = pool

  //   Estimate & manual for now. 288 = once every 5 mins. We can change once we have a better sense of this
  const autoCompoundFrequency = isAutoVault
    ? AUTO_VAULT_COMPOUND_FREQUENCY
    : MANUAL_POOL_AUTO_COMPOUND_FREQUENCY

  if (isAutoVault) {
    const autoApr =
      getApy(apr, AUTO_VAULT_COMPOUND_FREQUENCY, 365, performanceFee) * 100
    return { apr: autoApr, autoCompoundFrequency }
  }
  return { apr, autoCompoundFrequency }
}

export const getCakeVaultEarnings = (
  account: string,
  cakeAtLastUserAction: BigNumber,
  userShares: BigNumber,
  pricePerFullShare: BigNumber,
  earningTokenPrice: number,
) => {
  const hasAutoEarnings =
    account &&
    cakeAtLastUserAction &&
    cakeAtLastUserAction.gt(0) &&
    userShares &&
    userShares.gt(0)
  const { cakeAsBigNumber } = convertSharesToCake(userShares, pricePerFullShare)
  const autoCakeProfit = cakeAsBigNumber.sub(cakeAtLastUserAction)
  const autoCakeToDisplay = autoCakeProfit.gte(0)
    ? getBalanceNumber(autoCakeProfit, 18)
    : 0

  const autoUsdProfit = autoCakeProfit.mul(earningTokenPrice)
  const autoUsdToDisplay = autoUsdProfit.gte(0)
    ? getBalanceNumber(autoUsdProfit, 18)
    : 0
  return { hasAutoEarnings, autoCakeToDisplay, autoUsdToDisplay }
}

export const getPoolBlockInfo = (pool: any, currentBlock: number) => {
  const { startBlock, endBlock, isFinished } = pool
  const shouldShowBlockCountdown = Boolean(
    !isFinished && startBlock && endBlock,
  )
  const blocksUntilStart = Math.max(startBlock - currentBlock, 0)
  const blocksRemaining = Math.max(endBlock - currentBlock, 0)
  const hasPoolStarted = blocksUntilStart === 0 && blocksRemaining > 0
  const blocksToDisplay = hasPoolStarted ? blocksRemaining : blocksUntilStart
  return {
    shouldShowBlockCountdown,
    blocksUntilStart,
    blocksRemaining,
    hasPoolStarted,
    blocksToDisplay,
  }
}
