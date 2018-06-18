import { userWithInRange } from '../aql/location';
import { DocumentHandle } from 'arangojs/lib/cjs/collection';
import { findOne, insertDocument, changeDocument, replaceDocument, bulkImportDocument, removeDocument, bulkUpdateDocument } from '../aql/common';

// tslint:disable-next-line:no-var-requires
const DataLoader = require('dataloader');

export const findOneDocument = new DataLoader((data: any) => findOne(data[0].type, data[0].id));
export const findNearByUsers = new DataLoader(
  (lng: number, lat: number, range: number, limit: number) => {
    return userWithInRange(lng, lat, range, limit);
  });

export const createDocument = new DataLoader((args: any)  => insertDocument(args[0].type, args[0].data));
export const updateDocument = new DataLoader((args: any) => changeDocument(args[0].collection, args[0].documentHandle, args[0].data));
// tslint:disable-next-line:max-line-length
export const upsertDocument = new DataLoader((collection: string, documentHandle: DocumentHandle, data: object) => replaceDocument(collection, documentHandle, data));
export const deleteDocument = new DataLoader((collection: string, documentHandle: DocumentHandle) => removeDocument(collection, documentHandle));
export const updateManyDocument = new DataLoader((collection: string, documents: object[]) => bulkUpdateDocument(collection, documents));
export const importManyDocument = new DataLoader((collection: string, data: object) => bulkImportDocument(collection, data));

class Dataloaders {

  static common = {
    findOneDocument: new DataLoader((type: string, id: string) => findOne(type, id)),
    createDocument,
    updateDocument,
    upsertDocument,
    deleteDocument,
    updateManyDocument,
    importManyDocument,
  };

  static geo = {
    findNearByUsers,
  };
}

export default new Dataloaders();