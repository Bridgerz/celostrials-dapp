import { ethers } from "ethers"

export type TransactionEventCode =
  | "txSent"
  | "txConfirmed"
  | "txFailed"
  | "txError"

export interface TransactionStatusData {
  transactionHash: string
  status?: number
  blockNumber?: number
  failureReason?: string
}

export interface EmitterListener {
  (state: TransactionStatusData): boolean | undefined | void
}

export interface Emitter {
  listeners: {
    [key: string]: EmitterListener
  }
  on: (eventCode: TransactionEventCode, listener: EmitterListener) => void
  emit: (eventCode: TransactionEventCode, data: TransactionStatusData) => void
}

export type RevertReasonParams = {
  txHash: string
  networkId: number
  blockNumber: number
  provider: ethers.providers.BaseProvider
}

export type GetCodeParams = {
  tx: ethers.providers.TransactionResponse
  networkId: number
  blockNumber: number
  provider: ethers.providers.BaseProvider
}

export type TransactionNotifierInterface = {
  hash(transactionHash: string): Emitter
  setProvider(provider: ethers.providers.BaseProvider): void
  watchTransaction(transactionHash: string, emitter: Emitter): void
}
