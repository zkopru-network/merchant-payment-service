/**
 *
 * Asynchronously loads the component for Inventory
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Inventory = lazyLoad(
  () => import('./index'),
  module => module.Inventory,
);
