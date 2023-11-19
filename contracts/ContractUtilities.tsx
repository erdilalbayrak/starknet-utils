import { BigNumber, utils } from "ethers";

export class ContractUtilities {
  static chainId : () => "SN_MAINNET" | "SN_GOERLI" = () => {
    if (process.env.NEXT_PUBLIC_CURRENT_ENVIRONMENT === 'production') {
      return "SN_MAINNET"
    }
    return "SN_GOERLI"
  }

  static fromEtherToWei(ether: number | string): BigInt {
    return utils.parseUnits(ether.toString(), "ether");
  }

  static fromWeiToEther(wei: number | string): string {
    return utils.formatEther(wei);
  }

  static maskAddress = (address: string) => {
    if (!address) return "";
    return address.slice(0, 6) + "..." + address.slice(address.length - 4);
  };
}