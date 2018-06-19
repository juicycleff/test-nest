// import { ServerConfig } from 'orientjs';

export interface IDatabaseConfigAttributes {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: string;
  // tslint:disable-next-line:ban-types
  logging: boolean | Function;
  force: boolean;
  timezone: string;
}

export interface IOrientDbServer {
  host?: string;
  port?: string;
}

export interface IArangoDatabaseConfig {
  url: string;
  loadBalancingStrategy: string;
  databaseName: string;
  username: string;
  password: string;
  hostOdb?: string;
  portOdb?: number;
  // servers?: ServerConfig[];
}

export interface IDatabaseConfig {
  development: IDatabaseConfigAttributes;
  production: IDatabaseConfigAttributes;
  test: IDatabaseConfigAttributes;
}