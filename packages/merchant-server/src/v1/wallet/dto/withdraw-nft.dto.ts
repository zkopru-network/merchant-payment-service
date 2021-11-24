import {ApiModelPropertyOptional} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class WithdrawNftDto {
    @ApiModelPropertyOptional({
        description: "address of asset",
        example: "0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b",
    })
    addr: string;
    @ApiModelPropertyOptional({
        description: "nft id",
        example: "222",
    })
    nft: string;
    @ApiModelPropertyOptional({
        description: "fee to pay",
        example: "10",
    })
    fee: string;
    @ApiModelPropertyOptional({
        description: "address to withdraw",
        example: "0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b",
    })
    toL1Address?: string
}