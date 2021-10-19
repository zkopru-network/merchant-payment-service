import {createConnection, Connection, getConnection} from "typeorm";
import {ConnectionOptions} from "typeorm/connection/ConnectionOptions";

export class DB {
    private _option: ConnectionOptions;

    constructor(option: ConnectionOptions) {
        this._option = option;
    }

    async connection(connectionName?: string) {
        const currentConnectionName = connectionName ? connectionName : "default"
        try {
            return getConnection(currentConnectionName);
        } catch (ConnectionNotFoundError) {
            return await createConnection({...this._option, name: currentConnectionName});
        }
    }
}