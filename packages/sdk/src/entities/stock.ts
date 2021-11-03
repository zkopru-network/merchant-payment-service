import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
import {AssetType} from "../store/dto/stock.dto";

@Entity()
export class Stock extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "simple-enum",
        enum: AssetType
    })
    type;

    @Column()
    address: string;

    @Column()
    ownerAddress: string;

    @Column()
    assetId?: string;

    @CreateDateColumn()
    createdAt: Date

    @Column()
    atomicSwapSalt: string;

    // todo: erc20, erc721 support?
    @Column()
    price: string;
}