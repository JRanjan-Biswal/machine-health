'use client';
import { HeaderProvider } from '@/context/HeaderContext';
import { MillOverViewProvider } from '@/context/MillOverview';
import { CurrencySelectorProvider } from '@/context/CurrencyContext';
import LayoutContent from './LayoutContent';


function Layout({ children }) {

  return (
    <HeaderProvider>
      <MillOverViewProvider>
        <CurrencySelectorProvider>
          <LayoutContent>
            {children}
          </LayoutContent>
        </CurrencySelectorProvider>
      </MillOverViewProvider>
    </HeaderProvider>
  );
}

export default Layout;

