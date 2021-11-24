import {Inject} from "@nestjs/common";
import {Wallet} from "../../l2/wallet";
// @ts-ignore
import {F} from '@zkopru/babyjubjub'

export class WalletService {
    private wallet: Wallet;

    constructor(@Inject("WALLET") wallet: Wallet) {
        this.wallet = wallet;
    }

    async depositETH(amount: string, fee: string, toL2Address?: string, salt?: string) {
        await this.wallet.depositEther(amount, fee, toL2Address, salt);
    }

    async depositERC20(addr: string, amount: string, fee: string, toL2Address?: string) {
        await this.wallet.depositERC20("0", addr, amount, fee, toL2Address);
    }

    async depositNFT(addr: string, nft: string, amount: string, fee: string, toL2Address?: string) {
        await this.wallet.depositNFT("0", addr, nft, fee, toL2Address);
    }

    async withdrawETH(amount: string, fee: string, toL1Address?: string, salt?: string) {
        await this.wallet.withdrawEther(amount, fee, toL1Address, salt);
    }

    async withdrawERC20(eth: string, addr: string, amount: string, fee: string, toL1Address?: string) {
        await this.wallet.withdrawERC20(eth, addr, amount, fee, toL1Address);
    }

    async withdrawNFT(addr: string, nft: string, amount: string, fee: string, toL1Address?: string) {
        await this.wallet.withdrawNFT("0", addr, nft, fee, toL1Address);
    }

    async getBalances() {
        await this.wallet.getBalances();
    }
}