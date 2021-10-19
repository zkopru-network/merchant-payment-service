import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

export enum AssetType {
    ERC20,
    ERC721
}

@Entity()
export class Product extends BaseEntity{
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
    assetId?: string;

    @CreateDateColumn()
    createdAt: Date

    @Column()
    price: string;

    @Column({
        type: "simple-enum",
        enum: AssetType
    })
    paymentType;
}