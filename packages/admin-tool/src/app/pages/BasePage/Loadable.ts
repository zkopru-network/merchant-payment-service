/**
 *
 * Asynchronously loads the component for Balance
 *
 */

import { lazyLoad } from 'utils/loadable';

export const BasePage = lazyLoad(
  () => import('./index'),
  module => module.BasePage,
);
