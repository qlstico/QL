import React, { useState, createContext } from 'react';

export const TableContext = createContext();

export const TablesProvider = ({ children }) => {
  const [tables, setTables] = useState(['students', 'campuses', 'faculty']);
  return (
    <TableContext.Provider value={tables}>{children}</TableContext.Provider>
  );
};
