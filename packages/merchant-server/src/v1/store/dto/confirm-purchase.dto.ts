import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class ConfirmPurchaseDto {
    @ApiModelProperty({
        description: "stock id",
        example: "1234",
    })
    stockId: number;
    @ApiModelProperty({
        description: "from",
        example: "1234",
    })
    from: string;
    encodedTx: string;
}