import { Database } from 'arangojs';

// initializing database
const db = new Database({
  url: 'http://unizon.co.uk:8529',
  loadBalancingStrategy: 'ROUND_ROBIN',
});

// Switch to database
db.useDatabase('unizonn');

// Database auth
db.useBasicAuth('root', 'boldbone');

export default db;