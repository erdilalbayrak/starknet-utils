import { BigNumber, Contract, ContractInterface, ContractTransaction, Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'
import { ContractUtilities } from './ContractUtilities'

export class ContractWrapper {
  contract: Contract
  signerOrProvider: Signer | Provider
  constructor(
    contractAddress: string | `0x${string}`,
    abi: ContractInterface,
    signerOrProvider: Signer | Provider
  ) {
    this.contract = new Contract(contractAddress, abi, signerOrProvider)
    this.signerOrProvider = signerOrProvider
  }
  getContract(): Contract {
    return this.contract
  }

  // Important Note: If the contract to be called is not approved,
  // then the function to be called might fail.
  // In such scenarios this gas estimation would also be rejected.
  // It doesn't make sense to return a gas estimation to a function call which will be rejected
  async estimateGas(functionName: string, ...parameters: any[]) {
    try {
      const gasPrice =
        (await ContractUtilities.estimateGasPrice(this.signerOrProvider)) || BigNumber.from(-1)
      const f = this.contract.estimateGas[functionName]
      const gasEstimation = await (await f.apply(undefined, parameters))
      const gasPriceEstimationInWei = gasEstimation.mul(gasPrice)
      return gasPriceEstimationInWei
    } catch(_cannotCalculateGasEstimateException: any) {
      console.table(_cannotCalculateGasEstimateException)
      return undefined
    }
  }

  GENERIC_INFO_MESSAGE_GROUP = {
    title: "Your transaction is pending",
    message: "It can take couple of minutes to process."
  }

  createErrorMessageGroup = (title?: string, message?: string) => {
    return {
      title: title || "Your transaction could not be processed",
      message: message || "Please try again."
    }
  }

  handleNotification = async (
    tx: ContractTransaction,
    infoMessageGroup: MessageGroup,
    successMessageGroup: MessageGroup,
    errorMessageGroup: MessageGroup,
    callback = () => {}
  ) => {
    NotificationHelper.info(infoMessageGroup, tx.hash)
    if (tx.wait) {
      return tx
        .wait()
        .then((receipt) => {
          if (receipt.status === 0) {
            NotificationHelper.close(tx.hash)
            NotificationHelper.error(errorMessageGroup, tx.hash)
            callback()
          } else {
            NotificationHelper.close(tx.hash)
            NotificationHelper.success(successMessageGroup, tx.hash)
            callback()
          }
        })
        .catch((error) => {
          NotificationHelper.close(error.transactionHash)
          NotificationHelper.error(errorMessageGroup, error.transactionHash)
        })
    } else {
      NotificationHelper.close(tx.hash)
      NotificationHelper.success(successMessageGroup, tx.hash)
      callback()
    }
  }
}

export type MessageGroup = {
  title: string
  message: string
}

export class NotificationHelper {
  static info(messageGroup: MessageGroup, id: string = '') {
    console.log('INFO: ' + id + ':' + messageGroup.title + ' - ' + messageGroup.message)
  }

  static success(messageGroup: MessageGroup, id: string = '') {
    console.log('SUCCESS: ' + id + ':' + messageGroup.title + ' - ' + messageGroup.message)
  }

  static error(messageGroup: MessageGroup, id: string = '') {
    console.log('ERROR: ' + id + ':' + messageGroup.title + ' - ' + messageGroup.message)
  }

  static close(id: string) {
    console.log('CLOSE: ' + id)
  }
}
