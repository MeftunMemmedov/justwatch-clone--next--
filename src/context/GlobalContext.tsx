'use client';

import { fetchList } from '@/api/helpers';
import { User } from '@/types';
import { createContext, useState, ReactNode, useEffect } from 'react';

interface GlobalContextType {
  userDialogOpen: boolean;
  setUserDialogOpen: (open: boolean) => void;
  user: User;
  setUser: (user: User) => void;
}

export const GlobalContext = createContext<GlobalContextType | null>(null);

interface GlobalContextProviderProps {
  children: ReactNode;
}

export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderProps) => {
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const getUser = async (id: string) => {
    await fetchList<User[]>('Movies-Users', false).then((res) => {
      const user = res.find((u) => u.id === id);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('token') || '';
    getUser(token);
  }, []);
  return (
    <GlobalContext value={{ userDialogOpen, setUserDialogOpen, user, setUser }}>
      {children}
    </GlobalContext>
  );
};
