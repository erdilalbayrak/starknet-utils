import { connect } from '@argent/get-starknet'
import type { AccountInterface } from "starknet";
import type { AccountInterface as AccountInterfaceV4 } from "starknet4";

import useWeb3Context from 'context/web3'
import { Paragraph } from '../Text'
import classNames from 'classnames/bind'
import styles from './ConnectWallet.module.scss'
import { maskAddress } from 'contracts/ContractUtilities'
import { Contract } from 'starknet'
import { ContractUtilities } from '@/contracts/ContractUtilities'
import { useState } from 'react'

const cn = classNames.bind(styles)

const ConnectWallet = () => {
  const address = useWeb3Context((s) => s.address)
  const setAddress = useWeb3Context((s) => s.setAddress)
  const setProvider = useWeb3Context((s) => s.setProvider)
  const setAccount = useWeb3Context((s) => s.setAccount)
  const setStarknet = useWeb3Context((s) => s.setStarknet)

  //todo keep connected state in here as state and if connected, skip connect event
  const onClick = async () => {
    const starknet = await connect({
      chainId: ContractUtilities.chainId(),
      modalMode: "canAsk",
      modalTheme: "system",
      modalWalletAppearance: "all",
      alwaysShowDiscovery: true,
      dappName: "Flipblob",
    })
    if (!starknet) {
      throw Error("User rejected wallet selection or silent connect found nothing")
    }
    await starknet.enable()

    setStarknet(starknet)
    if(starknet.isConnected) {
      setAccount(starknet.account)
      setAddress(starknet.account.address)
    } else {
      setProvider(starknet.provider)
    }

    starknet.on("accountsChanged", (accounts: AccountInterface | AccountInterfaceV4) => {
      console.log("accountsChanged", accounts)
      setAddress(accounts[0])
    })
  }

  const notNullNotEmpty = (x: any) => x !== null && x !== undefined && x !== ''

  return (
    <div className={cn('connect-button')} onClick={onClick}>
      {notNullNotEmpty(address) ? maskAddress(address) : 'connect wallet'}
    </div>
  )
}

export default ConnectWallet
