import axios from 'axios'

export class CoinGecko {
  static ETH_ID: string = 'ethereum'
  static USD: string = 'usd'

  // The response will contain: avalanche-2: {usd: 123.45}, weth: {usd: 123.45}}
  // To get the prices: response.data[this.AVAX_ID][this.USD] or response.data[this.WETH_ID][this.USD]
  static fetchCoinPrices = async (
    coins: string[] = [this.ETH_ID],
    currency: string = this.USD
  ) => {
    return axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: coins.join(','),
        vs_currencies: currency,
      },
    })
  }
}

export class StarknetNameService {
  static fetchStarkName = (addr: string) => {
    return axios.get(`https://api.starknet.id/addr_to_domain?addr=${addr}`)
  }
}
