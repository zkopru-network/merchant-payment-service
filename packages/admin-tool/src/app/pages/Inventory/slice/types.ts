export interface Inventory {
  key: number;
  title: string;
  description: string;
  id: number;
  ticker: string;
  price: number;
  amount: number;
  total: number;
  type: string;
  imageUrl: string;
}

export interface InventoryState {
  data: Inventory[];
  firstModal: boolean;
  secondModal: boolean;
}
