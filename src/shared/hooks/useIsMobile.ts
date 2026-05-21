import { BREAKPOINTS } from '../constants';
import { useMediaQuery } from './useMediaQuery';

export const useIsMobile = (): boolean =>
  useMediaQuery(`(max-width: ${BREAKPOINTS.mobile - 1}px)`);
