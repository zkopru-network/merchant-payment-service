import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
import {AssetType} from "../store/dto/stock.dto";

@Entity()
export class Stock extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    address: string;

    @Column()
    ownerAddress: string;

    @Column({nullable:true})
    assetId?: string;

    @CreateDateColumn()
    createdAt: Date

    @Column({nullable:true})
    atomicSwapSalt: string;

    // todo: erc20, erc721 support?
    @Column()
    price: string;
}