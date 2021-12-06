// @ts-ignore
import {ZkTx} from "@zkopru/transaction";

export class ShieldedTxDto {
    public from: string;
    private encodedTx: string;

    constructor(from: string, encodedTx: string) {
        this.from = from;
        this.encodedTx = encodedTx;
    }

    toString(): string {
        return JSON.stringify(this);
    }

    static fromString(str: string): ShieldedTxDto {
        const jsonObject = JSON.parse(str) as ShieldedTxDto;
        return new ShieldedTxDto(jsonObject.from, jsonObject.encodedTx);
    }

    async toZkTx(): Promise<ZkTx> {
        return ZkTx.decode(Buffer.from(this.encodedTx))
    }
}
