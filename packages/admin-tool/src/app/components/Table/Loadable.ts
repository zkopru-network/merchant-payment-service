/**
 *
 * Asynchronously loads the component for Table
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Table = lazyLoad(
  () => import('./index'),
  module => module.Table,
);
