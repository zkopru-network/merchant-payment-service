import {ApiModelProperty, ApiModelPropertyOptional} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class DepositErc20Dto {
    @ApiModelPropertyOptional({
        description: "ether to send",
        example: "1234",
    })
    eth: string;
    @ApiModelProperty({
        description: "address of asset(erc20)",
    })
    addr: string;
    @ApiModelProperty({
        description: "amount to deposit",
    })
    amount: string;
    @ApiModelProperty({
        description: "fee to pay",
    })
    fee: string;
    @ApiModelProperty({
        description: "l2 address to deposit",
    })
    toL2Address?: string;
}