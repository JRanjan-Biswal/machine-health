'use client';
import { HeaderProvider } from '@/context/HeaderContext';
import { MillOverViewProvider } from '@/context/MillOverview';
import { CurrencySelectorProvider } from '@/context/CurrencyContext';
import { CustomerSelectedProvider } from '@/context/CustomerSelectedContext';
import LayoutContent from './LayoutContent';


function Layout({ children }) {

  return (
    <HeaderProvider>
      <MillOverViewProvider>
        <CurrencySelectorProvider>
          <CustomerSelectedProvider>
            <LayoutContent>
              {children}
            </LayoutContent>
          </CustomerSelectedProvider>
        </CurrencySelectorProvider>
      </MillOverViewProvider>
    </HeaderProvider>
  );
}

export default Layout;

