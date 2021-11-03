import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Purchase extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    stockId: number;

    @Column({nullable: true})
    receiptHash: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({nullable: true})
    clientShieldTx: string;

    @Column({nullable: true})
    merchantShieldTx: string;

    @Column()
    confirmed: boolean;

}