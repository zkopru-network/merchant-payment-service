import {ApiModelPropertyOptional} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class WithdrawEthDto {
    @ApiModelPropertyOptional({
        description: "amount to withdraw(with no decimal)",
        example: "100",
    })
    amount: string;
    @ApiModelPropertyOptional({
        description: "fee to pay(with no decimal)",
        example: "100",
    })
    fee: string;
    @ApiModelPropertyOptional({
        description: "address to withdraw",
        example: "0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b",
    })
    toL1Address?: string;
    @ApiModelPropertyOptional({
        description: "salt",
    })
    salt?: string;
}