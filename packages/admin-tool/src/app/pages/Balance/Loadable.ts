/**
 *
 * Asynchronously loads the component for Balance
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Balance = lazyLoad(
  () => import('./index'),
  module => module.Balance,
);
