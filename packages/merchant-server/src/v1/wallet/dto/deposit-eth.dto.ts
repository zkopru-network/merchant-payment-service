import {ApiModelProperty, ApiModelPropertyOptional} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class DepositEthDto {
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
    @ApiModelPropertyOptional({
        description: "salt",
    })
    salt?: string;
}