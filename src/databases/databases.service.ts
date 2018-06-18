import { Injectable, OnModuleDestroy } from '@nestjs/common';
import OrientDB from 'orientjs';
import { aql, Database } from 'arangojs';

@Injectable()
export class DatabasesService implements OnModuleDestroy {

  constructor(){
    // OrientDB
  }
  onModuleDestroy() {
    throw new Error('Method not implemented.');
  }

}
