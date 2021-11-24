import {ApiModelPropertyOptional} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class WithdrawErc20Dto{
    @ApiModelPropertyOptional({
        description: "ether to send",
        example: "100",
    })
    eth: string;
    @ApiModelPropertyOptional({
        description: "address of asset",
        example: "0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b",
    })
    addr: string;
    @ApiModelPropertyOptional({
        description: "amount to withdraw(with no decimal)",
        example: "100",
    })
    amount: string;
    @ApiModelPropertyOptional({
        description: "fee",
        example: "10",
    })
    fee: string;
    @ApiModelPropertyOptional({
        description: "address to withdraw",
        example: "0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b",
    })
    toL1Address?: string;
}