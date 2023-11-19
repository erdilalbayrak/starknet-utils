const maskAddress = (address: string | null | undefined) => {
  if (!address) return ''
  return address.slice(0, 6) + '...' + address.slice(address.length - 4)
}

const formatImageIPFSUrl = (url: string) => {
  return url.replace('feralas.infura-ipfs.io', 'ipfs.io')
}

export { maskAddress, formatImageIPFSUrl }
