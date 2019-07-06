import React, { useState, createContext } from 'react';

export const DbRelatedContext = createContext();

export const DbRelatedProvider = ({ children }) => {
  const [currentTable, setCurrentTable] = useState('users');
  const [tables, setTables] = useState(['todos']);
  const [selectedDb, setSelectedDb] = useState('todos');
  const [selectedTableData, setSelectedTableData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [serverStatus, setServerStatus] = useState(false);
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
        setSelectedUser,
        serverStatus,
        setServerStatus,
        currentTable,
        setCurrentTable
      }}
    >
      {children}
    </DbRelatedContext.Provider>
  );
};
