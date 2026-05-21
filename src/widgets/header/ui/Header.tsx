import { useIsMobile } from '@/shared/hooks';
import { DesktopHeader } from './DesktopHeader';
import { MobileHeader } from './MobileHeader';

export const Header = () => {
  const isMobile = useIsMobile();
  return isMobile ? <MobileHeader /> : <DesktopHeader />;
};
