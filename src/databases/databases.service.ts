import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { aql, Database } from 'arangojs';

@Injectable()
export class DatabasesService implements OnModuleDestroy {

  constructor(){
    // ghhg
  }
  onModuleDestroy() {
    throw new Error('Method not implemented.');
  }

}
