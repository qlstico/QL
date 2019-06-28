import React from 'react';
import { DisplayCard } from '../index';

const dummyTables = [
  { TableName: 'Users' },
  { TableName: 'Products' },
  { TableName: 'Sessions' },
  { TableName: 'Orders' },
];

const AllTables = props => {
  return (
    <div>
      <h1>Tables: </h1>
      {dummyTables.map(table => (
        <DisplayCard
          name={table.TableName}
          type="table"
          key={table.TableName}
        />
      ))}
    </div>
  );
};

export default AllTables;
