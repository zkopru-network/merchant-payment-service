export interface OptionMerchantSdk {
    secretKey: string;
    databaseType: "mysql" | "mariadb" | "postgres" | "sqlite";
    databaseUrl: string;
    mnemonic: string;
    hdWalletPassword: string;
    layer1Url: string;
    defaultCoordinatorFee: string;

}

export interface OptionCustomerSdk {
    MerchantServerUrl: string;

}