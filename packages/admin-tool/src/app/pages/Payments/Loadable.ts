/**
 *
 * Asynchronously loads the component for Payments
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Payments = lazyLoad(
  () => import('./index'),
  module => module.Payments,
);
