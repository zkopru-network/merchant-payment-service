import {Purchase} from "./purchase";
import {OptionCustomerSdk} from "../option";

export class Customer {
    private purchase: Purchase;
    constructor(option:OptionCustomerSdk) {
        this.purchase = new Purchase(option);
    }
}