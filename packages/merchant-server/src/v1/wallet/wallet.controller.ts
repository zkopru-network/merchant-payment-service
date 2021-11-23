import {Body, Controller, Delete, Get, Post, Query} from "@nestjs/common";
import {StoreService} from "../store/store.service";
import {WalletService} from "./wallet.service";
import {DepositEthDto} from "./dto/deposit-eth.dto";
import {DepositErc20Dto} from "./dto/deposit-erc20.dto";
import {DepositNftDto} from "./dto/deposit-nft.dto";
import {WithdrawErc20Dto} from "./dto/withdraw-erc20.dto";
import {WithdrawEthDto} from "./dto/withdraw-eth.dto";
import {WithdrawNftDto} from "./dto/withdraw-nft.dto";

@Controller("/wallet")
export class WalletController {
    private walletService: WalletService;

    constructor(walletService: WalletService) {
        this.walletService = walletService;
    }

    @Post("/eth")
    async depositETH(
        @Body() request: DepositEthDto
    ) {
        return this.walletService.depositETH(
            request.amount,
            request.fee,
            request.toL2Address,
            request.salt
        );
    }

    @Post("/erc20")
    async depositERC20(
        @Body() request: DepositErc20Dto
    ) {
        return this.walletService.depositERC20(
            request.eth,
            request.addr,
            request.amount,
            request.fee,
            request.toL2Address
        );
    }

    @Post("/nft")
    async depositNFT(
        @Body() request: DepositNftDto
    ) {
        return this.walletService.depositNFT(
            request.eth,
            request.addr,
            request.nft,
            request.fee,
            request.toL2Address
        );
    }

    @Delete("/eth")
    async withdrawETH(
        @Body() request: WithdrawEthDto
    ) {
        return this.walletService.withdrawETH(
            request.amount,
            request.fee,
            request.toL1Address,
            request.salt
        );
    }

    @Delete("/erc20")
    async withdrawERC20(
        @Body() request: WithdrawErc20Dto
    ) {
        return this.walletService.withdrawERC20(
            request.eth,
            request.addr,
            request.amount,
            request.fee,
            request.toL1Address
        );
    }

    @Delete("/nft")
    async withdrawNFT(
        @Body() request: WithdrawNftDto
    ) {
        return this.walletService.withdrawNFT(
            request.eth,
            request.addr,
            request.nft,
            request.fee,
            request.toL1Address
        );
    }

    @Get("/balances")
    async getBalances() {
        return this.walletService.getBalances();
    }
}
