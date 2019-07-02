import React, { useState, createContext } from 'react';

export const DbRelatedContext = createContext();

export const DbRelatedProvider = ({ children }) => {
  const [tables, setTables] = useState(['todos']);
  const [selectedDb, setSelectedDb] = useState('todos');
  const [selectedTableData, setSelectedTableData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  return (
    <DbRelatedContext.Provider
      value={{
        tables,
        setTables,
        selectedDb,
        setSelectedDb,
        selectedTableData,
        setSelectedTableData,
        selectedUser,
        setSelectedUser
      }}
    >
      {children}
    </DbRelatedContext.Provider>
  );
};
