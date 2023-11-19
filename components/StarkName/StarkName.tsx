import { maskAddress } from '@/contracts/ContractUtilities'
import { StarknetNameService } from '@/queries/ExternalQueries'
import { useState } from 'react'

const StarkNameLookupCache = new Map();
const StarkNameComponent = ({addr}:{addr: string}) => {
  const [nameShown, setNameShown] = useState<string>(maskAddress(addr))

  let starkName_fetcher = StarkNameLookupCache.get(addr)
  if(starkName_fetcher instanceof String) {
    setNameShown(starkName_fetcher)
  }
  else if (starkName_fetcher instanceof Promise) {
    starkName_fetcher.then((result: any) => {
      StarkNameLookupCache.set(addr, result.data.domain)
      setNameShown(result.data.domain)
    }).catch((error: any) => {
      StarkNameLookupCache.set(addr, maskAddress(addr))
    })
  }
  else {
    const starkName_fetcher = StarknetNameService.fetchStarkName(addr)
    StarkNameLookupCache.set(addr, starkName_fetcher)
    starkName_fetcher.then((result: any) => {
      StarkNameLookupCache.set(addr, result.data.domain)
      setNameShown(result.data.domain)
    }).catch((error: any) => {
      StarkNameLookupCache.set(addr, maskAddress(addr))
    })
  }
  return (
    <p>{nameShown}</p>
  )
}

export default StarkNameComponent
