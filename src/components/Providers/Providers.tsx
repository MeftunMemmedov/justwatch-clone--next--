import { GlobalContextProvider } from '@/context/GlobalContext';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  return <GlobalContextProvider>{children}</GlobalContextProvider>;
};

export default Providers;
