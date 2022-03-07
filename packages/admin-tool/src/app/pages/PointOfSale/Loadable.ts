/**
 *
 * Asynchronously loads the component for PointOfSale
 *
 */

import { lazyLoad } from 'utils/loadable';

export const PointOfSale = lazyLoad(
  () => import('./index'),
  module => module.PointOfSale,
);
