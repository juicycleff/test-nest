import { aql } from 'arangojs';
import db from './db';
import { DocumentHandle } from 'arangojs/lib/cjs/collection';

export async function findOne(type: string, id: string) {
  const query = aql`
    RETURN  DOCUMENT(${type + '/' + id})
  `;
  const results = await db.query(query);
  return results.all();
}

/**
 *
 * @param type name of collection
 * @param filter aql filter
 */
export async function find(type: string, filter: string) {
  const query = aql`
    FOR doc IN @{type}
      @{filter}
      RETURN doc
  `;
  const results = await db.query(query);
  return results.all();
}

export async function changeDocument(collection: string, documentHandle: object, data: object) {
  const results = await db.collection(collection).update(documentHandle, data);
  return [results];
}

export async function insertDocument(collection: string, data: object) {
  const results = await db.collection(collection).save(data);
  return results;
}

export async function replaceDocument(collection: string, documentHandle: DocumentHandle, data: object) {
  const results = await db.collection(collection).replace(documentHandle, data);
  return results;
}

export async function removeDocument(collection: string, documentHandle: DocumentHandle) {
  const results = await db.collection(collection).remove(documentHandle);
  return results;
}

export async function updateOrInsertDocument(collection: string, documentHandle: DocumentHandle) {
  const results = await db.collection(collection).remove(documentHandle);
  return results;
}

export async function bulkImportDocument(collection: string, data: object) {
  const results = await db.collection(collection).import(data, {waitForSync: true});
  return results;
}

export async function bulkUpdateDocument(collection: any, documents: object[]) {
  const results = await db.collection(collection).bulkUpdate(documents, {waitForSync: true});
  return results;
}