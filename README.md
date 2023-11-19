# starknet-utils
This project contains various utilities created for Starknet.

## ConnectWallet React Component
This component allows you to connect to a Starknet wallet and use it to sign transactions. It is a wrapper around the Starknet SDK's `Wallet` class.

## StarkName React Component
This component takes a Starknet account address and queries it's name from the Starknet Name Service. If the value is found, it is displayed. If not, a masked address is displayed.

## web3 React Context
This context allows you to use web3 in your React app. It is a wrapper around the Starknet SDK's `Contract` class.

It has the following properties:

- address
- provider
- account
- error
- onCorrectNetwork
- starknet

## ContractWrapper Abstract Class
This class allows you to extend with actual mainnet and testnet contract addresses and ABIs. It is a wrapper around the Starknet SDK's `Account` class.

## ExternalQueries
This class has calls for the Starknet Name Service and CoinGecko API for the token prices.

## ContractUtilities and utils
These classes have various utility functions for the Ethereum environments.
