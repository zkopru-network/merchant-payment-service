import {ApiModelProperty, ApiModelPropertyOptional} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class DepositNftDto {
    @ApiModelProperty({
        description: "address of asset(erc20)",
    })
    addr: string;
    @ApiModelProperty({
        description: "nft id",
    })
    nft: string;
    @ApiModelProperty({
        description: "fee to pay",
    })
    fee: string;
    @ApiModelProperty({
        description: "l2 address to deposit",
    })
    toL2Address?: string
}