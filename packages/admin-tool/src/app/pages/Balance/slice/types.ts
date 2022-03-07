export interface Balance {
  name: string;
  ticker: string;
  amount: number;
  usd: number;
}
export interface BalanceState {
  data: Balance[];
}
