import {AssetType} from "../../../core/store/dto/stock.dto";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";


export class RegisterStockDto {
    @ApiProperty()
    assetType: AssetType;
    @ApiProperty({
        description: "asset address(erc20, erc721)"
    })
    address: string;
    @ApiProperty({
        description: "address of owner"
    })
    ownerAddress: string;
    @ApiProperty({
        description: "price of asset"
    })
    price: string;
    @ApiPropertyOptional({
        description: "salt"
    })
    atomicSwapSalt: string;
    @ApiPropertyOptional({
        description: "sign"
    })
    sign: string;
}