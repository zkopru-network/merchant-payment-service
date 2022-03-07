import { LoginState } from 'app/pages/Login/slice/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly
import { BalanceState } from 'app/pages/Balance/slice/types';
import { InventoryState } from 'app/pages/Inventory/slice/types';
import { ThemeState } from 'styles/theme/slice/types';

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  theme?: ThemeState;
  balances?: BalanceState;
  inventories?: InventoryState;
  login?: LoginState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
