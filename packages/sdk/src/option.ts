export interface OptionMerchantSdk {
    secretKey: string;
    databaseType: "mysql" | "mariadb" | "postgres" | "sqlite";
    databaseUrl: string;
    privateKey: string;

}

export interface OptionCustomerSdk {
    MerchantServerUrl: string;

}