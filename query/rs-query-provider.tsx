'use client';

import { QueryClient } from '@tanstack/react-query';
import React, { FC, createContext, useState } from 'react';

export type RSQueryContextType = {
  queryClient: QueryClient;

  setQueryClient: (queryClient: QueryClient) => void;
};

const RSQueryContext = createContext<RSQueryContextType>(
  {} as RSQueryContextType
);

type RSQueryProviderProps = {
  children: React.ReactNode;
};

export const RSQueryProvider: FC<RSQueryProviderProps> = ({ children }) => {
  const [queryClient, setQueryClient] =
    useState<RSQueryContextType['queryClient']>();

  return (
    <RSQueryContext.Provider
      value={
        {
          queryClient,
          setQueryClient,
        } as RSQueryContextType
      }
    >
      {children}
    </RSQueryContext.Provider>
  );
};

export const useRSQuery = () => {
  const context = React.useContext(RSQueryContext);
  if (context === undefined) {
    throw new Error('useRSQuery must be used within a RSQueryProvider');
  }
  return context;
};
