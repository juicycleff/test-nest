import db from './db';

export async function connectEdge(collectionName: string, data: object) {
  const results = await db.edgeCollection(collectionName).save(data);
  return results;
}

export async function disConnectEdge(collectionName: string, documentHandle: object) {
  const results = await db.edgeCollection(collectionName).remove(documentHandle);
  return results;
}