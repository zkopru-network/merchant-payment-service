/**
 *
 * Asynchronously loads the component for Login
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Login = lazyLoad(
  () => import('./index'),
  module => module.Login,
);
