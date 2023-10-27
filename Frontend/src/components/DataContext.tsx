import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DataContextProps {
  children: ReactNode;
}

interface DataContextType {
  filepath: string;
  setFilepath: React.Dispatch<React.SetStateAction<string>>;
  broadband: boolean;
  setBroadband: React.Dispatch<React.SetStateAction<boolean>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<DataContextProps> = ({ children }) => {
  const [filepath, setFilepath] = useState('');
  const [broadband, setBroadband] = useState(false);

  return (
    <DataContext.Provider value={{ filepath, setFilepath, broadband, setBroadband }}>
      {children}
    </DataContext.Provider>
  );
};


export const useDataContext = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};
