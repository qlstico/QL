import React from 'react';
import { DisplayCard } from '../index';

const dummyDbs = [
  { dbName: 'Grace Shopper' },
  { dbName: 'qlStico' },
  { dbName: 'nyscene.' }
];

const AllDBs = props => {
  return (
    <div>
      <h1>Databases: </h1>
      {dummyDbs.map(db => (
        <DisplayCard name={db.dbName} type="db" />
      ))}
    </div>
  );
};

export default AllDBs;
