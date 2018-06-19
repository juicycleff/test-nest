import { Module, DynamicModule } from '@nestjs/common';
import { createArangoDbProviders, createOrientDbProviders } from './databases.provider';
import { createSign } from 'crypto';
import { IArangoDatabaseConfig } from '../common/config/interfaces/database.interface';

@Module({
})
export class DatabasesModule {
  static forRoot(options: IArangoDatabaseConfig): DynamicModule {
    const providers = createArangoDbProviders(options);
    const providersOrient = createOrientDbProviders(options);
    return {
      module: DatabasesModule,
      providers: [...providers, ...providersOrient],
      exports: [...providers, ...providersOrient],
    };
  }
}
