import { Injectable } from '@nestjs/common';
// import OrientDB, { ODatabase } from 'orientjs';
import { aql, Database } from 'arangojs';
import { DATABASE_ARANGRO, DATABASE_ORIENT } from './database.constants';
import { IArangoDatabaseConfig } from '../common/config/interfaces/database.interface';

export const createArangoDbProviders = (options: IArangoDatabaseConfig) => [
  {
    provide: DATABASE_ARANGRO,
    useFactory: () => {
      const adb = new Database({
        url: options.url,
        loadBalancingStrategy: 'ROUND_ROBIN',
      });

      // Switch to database
      adb.useDatabase(options.databaseName);
      adb.useBasicAuth(options.username, options.password);

      return adb;
    },
  },
];

export const createOrientDbProviders = (options: IArangoDatabaseConfig) => [
  {
    provide: DATABASE_ORIENT,
    useFactory: () => {
      /*const odb = new ODatabase({
        host: options.hostOdb,
        port: options.portOdb,
        username: options.username,
        password: options.password,
        name: options.databaseName,
      });

      // const odb = oServer.use(options.databaseName);

      return odb;*/
    },
  },
];
