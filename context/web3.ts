import create from 'zustand'
import type { AccountInterface, ProviderInterface } from "starknet";
import type { AccountInterface as AccountInterfaceV4, ProviderInterface as ProviderInterfaceV4 } from "starknet4";

interface Store {
  address: string | null
  setAddress: (address: string) => void
  provider: ProviderInterface | ProviderInterfaceV4 | null
  setProvider: (provider: ProviderInterface | ProviderInterfaceV4) => void
  account: AccountInterface | null
  setAccount: (account: AccountInterface | AccountInterfaceV4) => void
  error: string | null
  setError: (error: string | null) => void
  onCorrectNetwork: boolean | null
  setOnCorrectNetwork: (onCorrectNetwork: boolean | null) => void
  starknet: any
  setStarknet: (starknet: any) => void
}

const useWeb3Context = create<Store>((set) => ({
  address: null,
  setAddress: (address) => set({ address }),
  provider: null,
  setProvider: (provider) => set({ provider }),
  account: null,
  setAccount: (account) => set({ account }),
  error: null,
  setError: (error) => set({ error }),
  onCorrectNetwork: null,
  setOnCorrectNetwork: (onCorrectNetwork) => set({ onCorrectNetwork }),
  starknet: null,
  setStarknet: (starknet) => set({ starknet }),
}))

export default useWeb3Context
