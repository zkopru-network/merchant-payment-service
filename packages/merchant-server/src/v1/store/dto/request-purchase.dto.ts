import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class RequestPurchaseDto {
    @ApiModelProperty({
        description: "stock id",
        example: "1234",
    })
    stockId: number;
    @ApiModelProperty({
        description: "from address",
        example: "lasdkfjlksadfjklkawmflaksd",
    })
    from: string;
    @ApiModelProperty({
        description: "encoded tx",
        example: "tx....",
    })
    encodedTx: string;
}