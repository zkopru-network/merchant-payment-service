import {Body, Controller, Delete, Get, Post, Query} from "@nestjs/common";
import {WalletService} from "./wallet.service";
import {DepositEthDto} from "./dto/deposit-eth.dto";
import {DepositErc20Dto} from "./dto/deposit-erc20.dto";
import {DepositNftDto} from "./dto/deposit-nft.dto";
import {WithdrawErc20Dto} from "./dto/withdraw-erc20.dto";
import {WithdrawEthDto} from "./dto/withdraw-eth.dto";
import {WithdrawNftDto} from "./dto/withdraw-nft.dto";
import {ApiOperation, ApiTags} from "@nestjs/swagger";

@Controller("/wallet")
@ApiTags("wallet")
export class WalletController {
    private walletService: WalletService;

    constructor(walletService: WalletService) {
        this.walletService = walletService;
    }

    @Post("/eth")
    @ApiOperation({
        description: "deposit ether"
    })
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
    @ApiOperation({
        description: "deposit ERC20"
    })
    async depositERC20(
        @Body() request: DepositErc20Dto
    ) {
        return this.walletService.depositERC20(
            request.addr,
            request.amount,
            request.fee,
            request.toL2Address
        );
    }

    @Post("/nft")
    @ApiOperation({
        description: "deposit NFT(ERC721)"
    })
    async depositNFT(
        @Body() request: DepositNftDto
    ) {
        return this.walletService.depositNFT(
            request.addr,
            request.nft,
            request.fee,
            request.toL2Address
        );
    }

    @Delete("/eth")
    @ApiOperation({
        description: "Withdraw ETH"
    })
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
    @ApiOperation({
        description: "Withdraw ERC20"
    })
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
    @ApiOperation({
        description: "Withdraw NFT"
    })
    async withdrawNFT(
        @Body() request: WithdrawNftDto
    ) {
        return this.walletService.withdrawNFT(
            request.addr,
            request.nft,
            request.fee,
            request.toL1Address
        );
    }

    @Get("/balances")
    @ApiOperation({
        description: "get Balances"
    })
    async getBalances() {
        return this.walletService.getBalances();
    }
}
